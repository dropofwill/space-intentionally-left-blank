/**
* BoardService: contains actions related to users and boards.
*/
const Board = require('../models/Board');
const boardService = {};

// Create a board in the database
boardService.create = function(name) {

  const b = new Board.model({name: name});
  return b.save().then((result) => result.boardId);
};

// Remove a board from the database
boardService.destroy = function(boardId) {

  return Board.model.remove({boardId: boardId});
};

// find users
boardService.getUsers = function(boardId) {
  return Board.model.findOne({boardId: boardId})
  .populate('users', '-_id')
  .exec((board) => board.users);
};

// find admins
boardService.getAdmins = function(boardId) {
  return Board.model.findOne({boardId: boardId})
  .populate('admins', '-_id')
  .exec((board) => board.admins);
};

// find pending users
boardService.getPendingUsers = function(boardId) {
  return Board.model.findOne({boardId: boardId})
  .populate('pendingUsers', '-_id')
  .exec((board) => board.pendingUsers);
};

// Add a user to the board
boardService.addUser = function(boardId, userId) {

  return Board.model.find({boardId: boardId})
  .then(function(board) {
    board.users.add(userId);
    return board.save();
  })
  .catch(function(err) {
    throw new Error(err);
  });
};

// Remove a user from the board
boardService.removeUser = function(boardId, userId) {

  return Board.model.find({boardId: boardId})
  .then(function(board) {
    board.users.remove(userId);
    return board.save();
  })
  .catch(function(err) {
    throw new Error(err);
  });
};

// Add an admin to the board
boardService.addAdmin = function(boardId, userId) {

  return Board.model.find({boardId: boardId})
  .then(function(board) {
    board.admins.add(userId);
    return board.save();
  })
  .catch(function(err) {
    throw new Error(err);
  });
};

// Remove an admin to the board
boardService.removeAdmin = function(boardId, userId) {

  return Board.model.find({boardId: boardId})
  .then(function(board) {
    board.admins.remove(userId);
    return board.save();
  })
  .catch(function(err) {
    throw new Error(err);
  });
};

// Add a pending user to the board
boardService.addPendingUser = function(boardId, userId) {

  return Board.model.find({boardId: boardId})
  .then(function(board) {
    board.pendingUsers.add(userId);
    return board.save();
  })
  .catch(function(err) {
    throw new Error(err);
  });
};

// Remove a pending user from the board
boardService.removePendingUser = function(boardId, userId) {

  return Board.model.find({boardId: boardId})
  .then(function(board) {
    board.pendingUsers.remove(userId);
    return board.save();
  })
  .catch(function(err) {
    throw new Error(err);
  });
};

module.exports = boardService;
