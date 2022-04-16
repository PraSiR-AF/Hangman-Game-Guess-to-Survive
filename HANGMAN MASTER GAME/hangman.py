import random

import flask
from flask_sqlalchemy import SQLAlchemy
import os, sys
def base_path(path):
 if getattr(sys, 'frozen', None):
    basedir = sys._MEIPASS
 else:
    basedir = os.path.dirname(__file__)
 return os.path.join(basedir, path)
app = flask.Flask(__name__)

# Database

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hangman.db'
db = SQLAlchemy(app)

# Model

def random_pk():
    return random.randint(1e9, 1e10)

def random_word(level):
    words = [line.strip() for line in open('./static/words/words.txt')]
    word = random.choice(words).upper()
    if level =="easy":
        #less than 7
        words = [line.strip() for line in open('./static/words/easyWords.txt')]
            
        print(word)
        word = random.choice(words).upper()
    elif level == "medium":
        words = [line.strip() for line in open('./static/words/mediumWords.txt')]
        #between 7 and 9
        word = random.choice(words).upper()
    else:
        #greater than 10
        words = [line.strip() for line in open('./static/words/hardWords.txt')]
        word = random.choice(words).upper()
    
    print(word)
    return word
class Game(db.Model):
    pk = db.Column(db.Integer, primary_key=True, default=random_pk)
    word = db.Column(db.String(50), default=random_word)
    tried = db.Column(db.String(50), default='')
    player = db.Column(db.String(50))

    def __init__(self, player, level):
        self.player = player
        self.level = level
        self.word = random_word(level)
    @property
    def errors(self):
        return ''.join(set(self.tried) - set(self.word))

    @property
    def current(self):
        return ''.join([c if c in self.tried else '_' for c in self.word])

    @property
    def points(self):
        return 100 + 2*len(set(self.word)) + len(self.word) - 10*len(self.errors)

    # Play

    def try_letter(self, letter):
        if not self.finished and letter not in self.tried:
            self.tried += letter
            db.session.commit()

    # Game status

    @property
    def won(self):
        return self.current == self.word

    @property
    def lost(self):
        return len(self.errors) == 6

    @property
    def finished(self):
        return self.won or self.lost

# Controller

@app.route('/')
def home():
    games = sorted(
        [game for game in Game.query.all() if game.won],
        key=lambda game: -game.points)[:10]
    return flask.render_template('home.html', games=games)

@app.route('/play')
def new_game():
    player = flask.request.args.get('player')
    level = flask.request.args.get('level')
    print(level)
    game = Game(player, level)
    db.session.add(game)
    db.session.commit()
    return flask.redirect(flask.url_for('play', game_id=game.pk))

@app.route('/play/<game_id>', methods=['GET', 'POST'])
def play(game_id):
    game = Game.query.get_or_404(game_id)

    if flask.request.method == 'POST':
        letter = flask.request.form['letter'].upper()
        if len(letter) == 1 and letter.isalpha():
            game.try_letter(letter)
        
    if flask.request.is_xhr:
        return flask.jsonify(current=game.current,
                             errors=game.errors,
                             finished=game.finished)
    else:
        return flask.render_template('play.html', game=game)

# Main

if __name__ == '__main__':
    db.create_all()
    os.chdir(base_path('./'))
    app.run(host='0.0.0.0', debug=True)
""" if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True) """
