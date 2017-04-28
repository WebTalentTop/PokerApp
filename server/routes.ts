import * as express from 'express';


import CatsCtrl from './controllers/cats';
import Cat from './models/cat.model';
import StatsCtrl from './controllers/stats';
import Stat from './models/stat.model';

import BadgesCtrl from './controllers/badges';
import Badge from './models/badge.model';
import NotesCtrl from './controllers/notes';
import Note from './models/note.model';
export default function setRoutes(app) {


  const players = new CatsCtrl();

  // APIs
  app.route('/api/players').get(players.getAll);
  app.route('/api/players/count').get(players.count);
  app.route('/api/player').post(players.insert);
  app.route('/api/player/:id').get(players.getplayer);
  app.route('/api/player/:id').put(players.update);
  app.route('/api/player/:id').delete(players.delete);
   const stats = new StatsCtrl();

  app.route('/api/stats').get(stats.getAll);
  app.route('/api/stats/count').get(stats.count);
  app.route('/api/stat').post(stats.insert);
  app.route('/api/stat/:id').get(stats.get);
  app.route('/api/stat/:id').put(stats.update);
  app.route('/api/stat/:id').delete(stats.delete);

  const badges = new BadgesCtrl();

  app.route('/api/badges').get(badges.getAll);
  app.route('/api/badges/count').get(badges.count);
  app.route('/api/badge').post(badges.insert);
  app.route('/api/badge/:id').get(badges.get);
  app.route('/api/badge/:id').put(badges.update);
  app.route('/api/badge/:id').delete(badges.delete);

    const notes = new NotesCtrl();

  app.route('/api/notes').get(notes.getAll);
  app.route('/api/notes/count').get(notes.count);
  app.route('/api/note').post(notes.insert);
  app.route('/api/note/:id').get(notes.get);
  app.route('/api/note/:id').put(notes.update);
  app.route('/api/note/:id').delete(notes.delete);

}
