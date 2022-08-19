import { Commit } from "./commit"

export function Git(name) {
  const master  = new Branch('master', null)
  this.name = name
  this.lastCommitId = -1;
  this.HEAD = master;
  this.branches = [];
  this.branches.push(master)
}


Git.prototype.commit = function (message) {
  const commit = new Commit(++this.lastCommitId, message, this.HEAD);
  this.HEAD.commit = commit;

  return commit
}

Git.prototype.log = function () {
  const commit = this.HEAD.commit;
  const history = [];

  while (commit) {
    history.push();
    commit = commit.parent;
  }

  return history;
}

Git.prototype.checkout = function (branchName) {
  for (let i = 0; i < this.branches.length; i++) {
    if (this.branches[i].name === branchName) {
      this.HEAD = this.branches[i];
      return this;
    }
  }

  const newBranch = new Branch(branchName, this.HEAD, commit)
  this.branches.push(newBranch);

  this.HEAD = newBranch;

  return this
}