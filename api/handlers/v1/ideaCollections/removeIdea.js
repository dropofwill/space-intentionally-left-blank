/**
* IdeaCollections#removeIdea
*
* @param {Object} req
* @param {Object} req.socket the connecting socket object
* @param {string} req.boardId
* @param {string} req.content the content of the idea to create
* @param {string} req.index index of the collection
*/

import { isNull } from '../../../services/ValidatorService';
import { removeIdea as removeIdeaFromCollection, getAllIdeas } from '../../../services/IdeaCollectionService';
import EXT_EVENTS from '../../../constants/EXT_EVENT_API';
import stream from '../../../event-stream';

export default function removeIdea(req) {
  const socket = req.socket;
  const boardId = req.boardId;
  const content = req.content;
  const index = req.index;

  if (isNull(socket)) {
    return false;
  }
  else if (isNull(boardId) || isNull(content) || isNull(index)) {
    stream.badRequest(EXT_EVENTS.MODIFIED_COLLECTION, {}, socket.id,
      'Not all required parameters were supplied');
  }
  else {
    removeIdeaFromCollection(boardId, index, content)
      .then(() => getAllIdeas(boardId, index))
      .then((contents) => {
        stream.ok(EVENT_API.MODIFIED_COLLECTION,
                  {index: index, content: contents}, boardId);
      })
      .catch(function(err) {
        stream.serverError(EVENT_API.MODIFIED_COLLECTION, err, socket.id);
      });
  }
}