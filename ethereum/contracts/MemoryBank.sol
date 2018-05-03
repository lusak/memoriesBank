pragma solidity ^0.4.19;


contract MemoriesBankFactory {
    mapping(address => address) ownerToMemoriesBank;
    
    function createMemoriesBank() public {
        address newMemoriesBank = new MemoriesBank(msg.sender);
        ownerToMemoriesBank[msg.sender] = newMemoriesBank;
    }
    
    function getSenderMemoriesBank() public view returns(address) {
        return ownerToMemoriesBank[msg.sender];
    }
}

contract MemoriesBank {
    enum TypeOfMemory {POSITIVE, NEUTRAL, NEGATIVE}
    
    struct SingleMemory {
        uint index;
        uint date;
        string description;
        TypeOfMemory typeOfMemory;
    }
    
    SingleMemory[] public memories;
    address public owner;
    
    modifier restricted() {
        require(msg.sender == owner);
        _;
    }
    
    function MemoriesBank(address _owner) public {
        owner = _owner;
    }
    
    function addMemory(uint _date, string _description, uint _typeOfMemory) public restricted {
        uint index = memories.length;
        SingleMemory memory singleMemory = SingleMemory({
            index: index,
            date: _date,
            description: _description,
            typeOfMemory: TypeOfMemory(_typeOfMemory)
        });
        
        memories.push(singleMemory);
    }
    
    function modifyMemory(uint index, uint date, string description, uint typeOfMemory) public restricted {
        SingleMemory memory singleMemory = SingleMemory({
            index: index,
            date: date,
            description: description,
            typeOfMemory: TypeOfMemory(typeOfMemory)
        });
        memories[index] = singleMemory;
    }
    
    function deleteMemory(uint index) public restricted {
        ///This leaves empty element. UI should discard such elements.
        //Or I can rearange this to leave no empty elements
        delete memories[index];
    }
    
    function getMemoriesCount() public view returns (uint) {
        return memories.length;
    }
}