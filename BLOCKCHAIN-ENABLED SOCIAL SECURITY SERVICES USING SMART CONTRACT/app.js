window.addEventListener('load', async () => {
    // Connect to Ganache
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  
    // Manually enter ABI and contract address
    const abi = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "contributions",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "names",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "totalBalance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "withdrawals",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          }
        ],
        "name": "storeName",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "getName",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "contribute",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "getContribution",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "getWithdrawal",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "getTotalBalance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      }
    ];
    const contractAddress ="0xe8Fb569811c7754717A3095C96DA38eb49e950D5";  
  
    const contract = new web3.eth.Contract(abi, contractAddress);
    const accounts = await web3.eth.getAccounts();
    const defaultAccount = accounts[0];
  
    // Store Name
    document.getElementById("storeForm").onsubmit = async (e) => {
      e.preventDefault();
      const id = document.getElementById("userId").value;
      const name = document.getElementById("userName").value;
  
      await contract.methods.storeName(id, name).send({ from: defaultAccount });
      alert("Name stored successfully!");
    };
  
    // Get Name
    window.getName = async () => {
      const id = document.getElementById("getId").value;
      const name = await contract.methods.getName(id).call();
      document.getElementById("output").innerText = `Name: ${name}`;
    };
  
    // Contribute
    document.getElementById("contributeForm").onsubmit = async (e) => {
      e.preventDefault();
      const id = document.getElementById("contributeId").value;
      const amount = document.getElementById("contributeAmount").value;
  
      await contract.methods.contribute(id, web3.utils.toWei(amount, 'ether')).send({ from: defaultAccount });
      alert("Contribution successful!");
    };
  
    // Withdraw
    document.getElementById("withdrawForm").onsubmit = async (e) => {
      e.preventDefault();
      const id = document.getElementById("withdrawId").value;
      const amount = document.getElementById("withdrawAmount").value;
  
      await contract.methods.withdraw(id, web3.utils.toWei(amount, 'ether')).send({ from: defaultAccount });
      alert("Withdrawal successful!");
    };
  
    // Get Contribution
    window.getContribution = async () => {
      const id = document.getElementById("getContributionId").value;
      const contribution = await contract.methods.getContribution(id).call();
      document.getElementById("contributionOutput").innerText = `Contribution: ${web3.utils.fromWei(contribution, 'ether')} ETH`;
    };
  
    // Get Withdrawal
    window.getWithdrawal = async () => {
      const id = document.getElementById("getWithdrawalId").value;
      const withdrawal = await contract.methods.getWithdrawal(id).call();
      document.getElementById("withdrawalOutput").innerText = `Withdrawal: ${web3.utils.fromWei(withdrawal, 'ether')} ETH`;
    };
  
    // Get Total Balance
    window.getTotalBalance = async () => {
      const totalBalance = await contract.methods.getTotalBalance().call();
      document.getElementById("totalBalanceOutput").innerText = `Total Balance: ${web3.utils.fromWei(totalBalance, 'ether')} ETH`;
    };
  });
  