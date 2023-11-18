/**
 * Generate unique id for entities
 *
 * @param prefix key prefix
 * @returns new id
 */
export const id = (prefix: string) => `${prefix}_${Math.random().toString(36).substring(2, 7)}`;

/**
 * Makes it compatible to add the message object to the entities collection
 *
 * @param msg ui message
 * @returns message entity
 */
export const prepareAsEntity = (keyPrefix: string, state: any) => {
  if (!state.id) {
    return {
      ...state,
      id: id(keyPrefix),
    };
  }
  return state;
};
