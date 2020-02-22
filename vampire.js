class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let counter = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      counter++;
    }
    return counter;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.offspring === null) {
      return false;
    }
    for (let i = 0; i < this.numberOfOffspring; i++) {
      if (vampire.name === this.offspring[i].name) {
        return true;
      }
    }
    return false;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let vampireName = null;
    if (this.name === name) {
      return this;
    }
    for (const offspring of this.offspring) {
      if (vampireName) break;
      vampireName = offspring.vampireWithName(name);
    }
    return vampireName;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalVampire = 0;
    for (const vampire of this.offspring) {
      totalVampire++;
      if (vampire.numberOfOffspring !== 0)
        totalVampire += vampire.totalDescendents;
    }
    return totalVampire;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let arrayOfMillennial = [];
    console.log('Before the for loop --> ', arrayOfMillennial.length);
    for (const vampires of this.offspring) {
    console.log('Inside the for loop --> ', arrayOfMillennial.length);
      if (vampires.numberOfOffspring >= 0) {
        const vampireOver1980 = vampires.allMillennialVampires;
        if (vampires.yearConverted > 1980) {
          arrayOfMillennial.push(vampires);
        }
        arrayOfMillennial = arrayOfMillennial.concat(vampireOver1980);
      } 
    }console.log('after the for loop --> ', arrayOfMillennial.length);
    return arrayOfMillennial;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (this.name === vampire.name) {
      return this;
    }
  }
}

module.exports = Vampire;
