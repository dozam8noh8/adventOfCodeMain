import * as fs from 'fs';

const NEW_FISH_VALUE = 8;
const EXISTING_FISH_VALUE = 6;
const ABOUT_TO_BE_PREGNANT = 0;
const NUM_DAYS = 256;

const fname = __dirname+'/input.txt'
export function day6part1() {
    fs.readFile(fname, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let fishes = data.split(",").map(el => Number(el));
        let fishMap: Map<number, number> = new Map();
        for (let fish of fishes) {
            if (fishMap.has(fish)) {
                fishMap.set(fish, fishMap.get(fish) + 1);
            }
            else {
                fishMap.set(fish, 1);
            }

        }
        //console.log(fishes);
        //console.log(fishMap);
        for (let i = 0; i < NUM_DAYS; i++) {
            fishMap = tickFishes(fishMap);
        }
        console.log("There are: ", getTotalFish(fishMap) , " fishies")
    })

}

function tickFishes(fishes: Map<number, number>) {
    let newFishMap = new Map<number, number>();
    for(let [fishKey, fishAmount] of fishes) {
        // Do this last.
        if (fishKey === ABOUT_TO_BE_PREGNANT) {
            continue
        }
        else {
            newFishMap.set(fishKey - 1, fishAmount);
        }
    }
    const pregnantFishes = fishes.get(ABOUT_TO_BE_PREGNANT) || 0;
    newFishMap.set(NEW_FISH_VALUE, pregnantFishes)
    newFishMap.set(EXISTING_FISH_VALUE, pregnantFishes + (newFishMap.get(EXISTING_FISH_VALUE) || 0));
    //console.log(newFishMap);
    return newFishMap;
}

function getTotalFish(fishMap: Map<number, number>): number {
    let total = 0;
    for (let [key, value] of fishMap) {
        total += value;
    }
    return total;
}  