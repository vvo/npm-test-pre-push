findGitRoot(function(gitRoot) {
  var path = require('path');
  var hookscript = path.join(__dirname, 'pre-push');
  var hookDest = path.join(gitRoot, '.git/hooks/pre-push');

  createLink(hookscript, hookDest);
});

function createLink(from, to) {
  var util = require('util');
  var spawn = require('child_process').spawn;
  var cmd = 'ln';
  var args = [
    '-s',
    from,
    to
  ];

  spawn(cmd, args)
}

function findGitRoot(cb) {
  var spawn = require('child_process').spawn;
  var cmd = 'git';
  var args = 'rev-parse --show-toplevel'.split(' ');

  var spawned = spawn(cmd, args);
  spawned.stdout.on('data', function(data) {
    cb(data.toString('utf-8').trim());
  });
}