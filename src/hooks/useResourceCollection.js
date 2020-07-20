import API from '../services/API';
import useSWR from 'swr';
import produce from 'immer';
import { findIndex, omit, find } from 'lodash';
import uniqid from 'uniqid';
import { useState } from 'react';

export default function useResourceCollection (collectionRelativeUrl) {
  collectionRelativeUrl = '/' + collectionRelativeUrl.replace('/', '');
  let fetchResponse = null;
  const { data: collection, error: fetchCollectionError, mutate } = useSWR(collectionRelativeUrl, {
    fetcher: async (...args) => {
      fetchResponse = API.get(...args);
      const res = await fetchResponse;
      return res.data.data;
    }
  });
  const [newResourceIsSaving, setNewResourceIsSaving] = useState(false);
  const [newResourceSaveError, setNewResourceSaveError] = useState(null);
  const getRessource = async (id) => {
    return collection ? find(collection, r => r.id === id) : undefined;
  };

  const patchResourceLocally = (id, changedAttributes) => {
    return new Promise((resolve, reject) => {
      mutate(async collectionItems => {
        return produce(collectionItems, draft => {
          const localResourceIndex = findIndex(draft, { id });
          if (localResourceIndex === -1) {
            reject(new Error('index not found'));
          } else {
            const newVersion = { ...draft[localResourceIndex], ...changedAttributes };
            draft[localResourceIndex] = newVersion;
            resolve(newVersion);
          }
        });
      }, false);
    });
  };

  const addResourceLocally = async attributes => {
    return new Promise((resolve) => {
      mutate(async collectionItems => {
        return produce(collectionItems, draft => {
          const newResourceAttributes = { id: uniqid(), ...attributes };
          draft.push(newResourceAttributes);
          resolve(newResourceAttributes);
        });
      }, false);
    });
  };

  const deleteResourceLocally = async id => {
    return new Promise((resolve, reject) => {
      mutate(async collectionItems => {
        return produce(collectionItems, draft => {
          const localResourceIndex = findIndex(draft, { id });
          if (localResourceIndex === -1) {
            reject(new Error('index not found'));
          } else {
            draft.splice(localResourceIndex, 1);
            resolve();
          }
        });
      }, false);
    });
  };

  const createResource = async (attributes, optimistic = false, resolve, reject) => {
    const sanitizedAttributes = omit(attributes, ['id', '_saving', '_deleting']);
    setNewResourceIsSaving(true);
    setNewResourceSaveError(null);

    if (optimistic) {
      let tmpId;
      try {
        tmpId = (await addResourceLocally({ ...attributes, _saving: true })).id;
        const res = await API.post(collectionRelativeUrl, sanitizedAttributes);
        patchResourceLocally(tmpId, { ...res.data.data, _saving: false });
        resolve(res);
      } catch (err) {
        console.error(err);
        setNewResourceSaveError(err);
        deleteResourceLocally(tmpId);
        reject(err);
      } finally {
        setNewResourceIsSaving(false);
      }
    } else {
      try {
        const res = await API.post(collectionRelativeUrl, sanitizedAttributes);
        addResourceLocally(res.data.data);
        resolve(res);
      } catch (err) {
        console.error(err);
        setNewResourceSaveError(err);
        reject(err);
      } finally {
        setNewResourceIsSaving(false);
      }
    }
  };

  const updateResource = async (attributes, optimistic = false, resolve, reject) => {
    const sanitizedAttributes = omit(attributes, ['id', '_saving', '_deleting']);
    if (optimistic) {
      let savedAttributes = {};
      try {
        savedAttributes = { ...(await getRessource(attributes.id)) };
        await patchResourceLocally(attributes.id, { ...attributes, _saving: true });
        const res = await API.patch(collectionRelativeUrl + '/' + attributes.id, sanitizedAttributes);
        await patchResourceLocally(attributes.id, { ...res.data.data, _saving: false });
        resolve(res);
      } catch (err) {
        console.error(err);
        await patchResourceLocally(attributes.id, { ...savedAttributes, _saving: false });
        reject(err);
      }
    } else {
      try {
        await patchResourceLocally(attributes.id, { _saving: true });
        const res = await API.patch(collectionRelativeUrl + '/' + attributes.id, sanitizedAttributes);
        await patchResourceLocally(attributes.id, { ...res.data.data, _saving: false });
        resolve(res);
      } catch (err) {
        console.error(err);
        await patchResourceLocally(attributes.id, { _saving: false });
        reject(err);
      }
    }
  };

  const saveResource = async (attributes, options = {}) => {
    const { optimistic } = options;
    return new Promise((resolve, reject) => {
      if (!attributes.id) {
        createResource(attributes, optimistic, resolve, reject);
      } else {
        updateResource(attributes, optimistic, resolve, reject);
      }
    });
  };

  const deleteResource = async (id, options = {}) => {
    const { optimistic } = options;
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      if (optimistic) {
        let savedAttributes = {};
        try {
          savedAttributes = { ...(await getRessource(id)) };
          await deleteResourceLocally(id);
          const res = await API.delete(collectionRelativeUrl + '/' + id);
          resolve(res);
        } catch (err) {
          if (savedAttributes) {
            await addResourceLocally(savedAttributes);
          }
          console.error(err);
          reject(err);
        }
      } else {
        try {
          await patchResourceLocally(id, { _deleting: true });
          const res = await API.delete(collectionRelativeUrl + '/' + id);
          await deleteResourceLocally(id);
          resolve(res);
        } catch (err) {
          await patchResourceLocally(id, { _deleting: false });
          console.error(err);
          reject(err);
        }
      }
    });
  };

  return {
    saveResource,
    collection,
    fetchCollectionError,
    newResourceIsSaving,
    newResourceSaveError,
    fetchResponse,
    updateResource,
    deleteResource
  };
}
