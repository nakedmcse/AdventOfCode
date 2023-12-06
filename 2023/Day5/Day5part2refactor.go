//Go version by @VictoriqueM
package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

type LongPair struct {
	first  int64
	second int64
}

func (lp LongPair) MutateSeed(seed, key int64) int64 {
	if seed >= key && seed <= key+lp.second {
		return lp.first + (seed - key)
	}
	return seed
}

func main() {
	file, err := os.Open("inputfile.txt")
	if err != nil {
		fmt.Println("Error opening input file:", err)
		return
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	seedToSoil := make(map[int64]LongPair, 1000)
	soilToFertilizer := make(map[int64]LongPair, 1000)
	fertilizerToWater := make(map[int64]LongPair, 1000)
	waterToLight := make(map[int64]LongPair, 1000)
	lightToTemp := make(map[int64]LongPair, 1000)
	tempToHumidity := make(map[int64]LongPair, 1000)
	humidityToLocation := make(map[int64]LongPair, 1000)

	var seeds []LongPair

	var minLoc int64
	var targetDict string

	for scanner.Scan() {
		line := scanner.Text()

		if strings.HasPrefix(line, "seeds:") {
			seedlist := strings.Split(line, ":")[1]
			seedMatcher := regexp.MustCompile("(\\d+)\\s+(\\d+)").FindAllStringSubmatch(seedlist, -1)
			for _, match := range seedMatcher {
				startNum, _ := strconv.ParseInt(match[1], 10, 64)
				seedRange, _ := strconv.ParseInt(match[2], 10, 64)
				seeds = append(seeds, LongPair{startNum, seedRange})
			}
			fmt.Println("Built Seed Range List:", len(seeds))
			continue
		}

		if strings.Contains(line, "-") {
			targetDict = strings.Split(line, "-")[0]
			continue
		}

		numberMatcher := regexp.MustCompile("(\\d+)\\s+(\\d+)\\s+(\\d+)").FindStringSubmatch(line)
		if len(numberMatcher) > 0 {
			source, _ := strconv.ParseInt(numberMatcher[2], 10, 64)
			destRange := LongPair{
				first:  parseLong(numberMatcher[1]),
				second: parseLong(numberMatcher[3]),
			}

			switch targetDict {
			case "seed":
				seedToSoil[source] = destRange
			case "soil":
				soilToFertilizer[source] = destRange
			case "fertilizer":
				fertilizerToWater[source] = destRange
			case "water":
				waterToLight[source] = destRange
			case "light":
				lightToTemp[source] = destRange
			case "temperature":
				tempToHumidity[source] = destRange
			case "humidity":
				humidityToLocation[source] = destRange
			}
		}
	}

	for _, seedrange := range seeds {
		fmt.Println("Starting next seed range...")
		for seed := seedrange.first; seed < seedrange.first+seedrange.second; seed++ {
			currentSeed := seed
			currentSeed = applyMap(seedToSoil, currentSeed)
			currentSeed = applyMap(soilToFertilizer, currentSeed)
			currentSeed = applyMap(fertilizerToWater, currentSeed)
			currentSeed = applyMap(waterToLight, currentSeed)
			currentSeed = applyMap(lightToTemp, currentSeed)
			currentSeed = applyMap(tempToHumidity, currentSeed)
			currentSeed = applyMap(humidityToLocation, currentSeed)

			if minLoc == 0 {
				minLoc = currentSeed
				continue
			}

			if currentSeed < minLoc {
				minLoc = currentSeed
			}
		}
	}

	fmt.Println("PART 2")
	fmt.Println("Min Location:", minLoc)
}

func applyMap(m map[int64]LongPair, seed int64) int64 {
	for key, rangeMod := range m {
		if seed >= key && seed < key+rangeMod.second {
			return rangeMod.MutateSeed(seed, key)
		}
	}
	return seed
}

func parseLong(s string) int64 {
	result, _ := strconv.ParseInt(s, 10, 64)
	return result
}
