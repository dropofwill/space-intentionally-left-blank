/**
* /v1/room/leave
*
* @param {Object} req
* @param {Object} req.socket the connecting socket object
* @param {string} req.boardId the id of the room to leave
*/

import { isNull } from '../../../services/ValidatorService';
import EXT_EVENTS from '../../../constants/EXT_EVENT_API';
import INT_EVENTS from '../../../constants/INT_EVENT_API';
import stream from '../../../event-stream';

export default function leave(req) {
  const socket = req.socket;
  const boardId = req.boardId;

  if (isNull(socket)) {
    return false;
  }
  else if (isNull(boardId)) {
    stream.badRequest(EXT_EVENTS.LEFT_ROOM, {}, socket.id,
      'Not all required parameters were supplied');
  }
  else {
    stream.leave(socket, boardId);
    stream.ok(boardId, EXT_EVENTS.LEFT_ROOM,
       `User with socket id ${socket.id} left board ${boardId}`);
  }
}
