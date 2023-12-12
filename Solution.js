class RangeList {
    constructor() {
      // Initialize an empty array to store the ranges
      this.ranges = [];
    }
  
    add(range) {
      let [start, end] = range;
      let newRanges = [];
      let i = 0;
  
      // Add all the ranges that come before the new range
      while (i < this.ranges.length && this.ranges[i][1] < start) {
        newRanges.push(this.ranges[i]);
        i++;
      }
  
      // Merge all the overlapping ranges
      while (i < this.ranges.length && this.ranges[i][0] <= end) {
        start = Math.min(start, this.ranges[i][0]);
        end = Math.max(end, this.ranges[i][1]);
        i++;
      }
  
      // Add the new merged range
      newRanges.push([start, end]);
  
      // Add all the ranges that come after the new range
      while (i < this.ranges.length) {
        newRanges.push(this.ranges[i]);
        i++;
      }
  
      // Update the ranges array
      this.ranges = newRanges;
    }
  
    remove(range) {
      let [start, end] = range;
      let newRanges = [];
      let i = 0;
  
      // Add all the ranges that come before the range to be removed
      while (i < this.ranges.length && this.ranges[i][1] < start) {
        newRanges.push(this.ranges[i]);
        i++;
      }
  
      // Split all the overlapping ranges
      while (i < this.ranges.length && this.ranges[i][0] < end) {
        if (this.ranges[i][0] < start) {
          newRanges.push([this.ranges[i][0], start]);
        }
  
        if (this.ranges[i][1] > end) {
          newRanges.push([end, this.ranges[i][1]]);
        }
  
        i++;
      }
  
      // Add all the ranges that come after the range to be removed
      while (i < this.ranges.length) {
        newRanges.push(this.ranges[i]);
        i++;
      }
  
      // Update the ranges array
      this.ranges = newRanges;
    }
  
    toString() {
      // Convert each range to a string and join them with a space
      return this.ranges.map((range) => `[${range[0]}, ${range[1]})`).join(' ');
    }
  }
  
  const rl = new RangeList();
  console.log(rl.toString()); // Should be ""
  rl.add([1, 5]);
  console.log(rl.toString()); // Should be: "[1, 5)"
  rl.add([10, 20]);
  console.log(rl.toString()); // Should be: "[1, 5) [10, 20)"
  rl.add([20, 20]);
  console.log(rl.toString()); // Should be: "[1, 5) [10, 20)"
  rl.add([20, 21]);
  console.log(rl.toString()); // Should be: "[1, 5) [10, 21)"
  rl.add([2, 4]);
  console.log(rl.toString()); // Should be: "[1, 5) [10, 21)"
  rl.add([3, 8]);
  console.log(rl.toString()); // Should be: "[1, 8) [10, 21)"
  rl.remove([10, 10]);
  console.log(rl.toString()); // Should be: "[1, 8) [10, 21)"
  rl.remove([10, 11]);
  console.log(rl.toString()); // Should be: "[1, 8) [11, 21)"
  rl.remove([15, 17]);
  console.log(rl.toString()); // Should be: "[1, 8) [11, 15) [17, 21)"
  rl.remove([3, 19]);
  console.log(rl.toString()); // Should be: "[1, 3) [19, 21)"