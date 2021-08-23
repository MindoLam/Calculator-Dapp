pragma solidity >=0.8.0;

contract AdditionSubtraction {
  int answer;

  constructor() payable {
    answer = 0;
  }

  function add(int x) public payable {
    answer = answer + x;
  }

  function subtract(int y) public payable {
    answer = answer - y;
  }

  function divide(int w) public payable {
    answer = answer / w;
  }

  function multiply(int z) public payable {
    answer = answer * z;
  }

  function show() public view returns (int) {
    return answer;
  }

  function clear() public payable {
    answer = 0;
  }
}