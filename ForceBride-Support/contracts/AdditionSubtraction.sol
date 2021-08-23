pragma solidity >=0.8.0;

contract AdditionSubtraction {
  uint answer;

  constructor() payable {
    answer = 0;
  }

  function add(uint x) public payable {
    answer = answer + x;
  }

  function subtract(uint y) public payable {
    answer = answer - y;
  }

  function show() public view returns (uint) {
    return answer;
  }

  function clear() public payable {
    answer = 0;
  }
}