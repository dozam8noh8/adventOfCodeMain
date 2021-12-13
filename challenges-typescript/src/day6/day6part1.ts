import * as fs from 'fs';

const NEW_FISH_VALUE = 8;
const EXISTING_FISH_VALUE = 6;
const ABOUT_TO_BE_PREGNANT = 0;
const NUM_DAYS = 80;

const fname = __dirname+'/input.txt'
export function day6part1() {
    fs.readFile(fname, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let fish = data.split(",").map(el => Number(el));
        console.log(fish);
        for (let i = 0; i < NUM_DAYS; i++) {
            fish = tickFishes(fish);
        }
        console.log("There are: ", fish.length, " fishies")
    })

}

function tickFishes(fishes: number[]) {
    let newFish = [];
    fishes = fishes.map(fish => {
        if (fish === ABOUT_TO_BE_PREGNANT) {
            newFish.push(NEW_FISH_VALUE);
            fish = EXISTING_FISH_VALUE;
        } else {
            fish -= 1;
        }
        return fish;
    })
    //console.log(fishes);
    return fishes.concat(newFish);
}