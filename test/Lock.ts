import { expect } from "chai";
import { ethers } from "hardhat";

describe("*****Supply chain contract*****", async () => {
  let supplychain: any;
  let signer: any;
  beforeEach(async () => {
    signer = await ethers.getSigners();
    const SupplyChain = await ethers.getContractFactory("SupplyChain");
    supplychain = await SupplyChain.connect(signer[0]).deploy();
    // await supplychain.deployed();

    const farmerAddress = await supplychain.addFarmer(signer[1]);
    console.log("The famer address is       =====> ", signer[1].address)
    const addDistributorAddress = await supplychain.addDistributor(signer[2]);
    console.log("The Distributor address is =====> ", signer[2].address)
    const addRetailerAddress = await supplychain.addRetailer(signer[3]);
    console.log("The Retailer address is    =====> ", signer[3].address)
    const addConsumerAddress = await supplychain.addConsumer(signer[4]);
    console.log("The Consumer address is    =====> ", signer[4].address)
    // const isFarmerAddr = await supplychain.isFarmer(signer[1]);
    // console.log("Address of the Farmer ===> ", isFarmerAddr);

  });
  async function printdetail() {
    console.log("****************************************************************")
    const fetchItemone = await supplychain.fetchItemBufferOne(123);
    console.log("Fetch Items One ========> ", fetchItemone)
    console.log("****************************************************************")
    const fetchItemtwo = await supplychain.fetchItemBufferTwo(123);
    console.log("Fetch Items Two ========> ", fetchItemtwo)
    console.log("****************************************************************")
    const fetchItemhistory = await supplychain.fetchitemHistory(123);
    console.log("Fetch Items History ========> ", fetchItemhistory)
    console.log("****************************************************************")
    const getdetails = await supplychain.getItemDetailsExtended(123);
    console.log("Details of Items ========> ", getdetails)
  }
  it("******** 1. Address use in contract ********", async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("Address at which supply chain contract deployed =====> ", supplychain.target);
    console.log("Address of owner of this contract               =====> ", signer[0].address);
    console.log("Address of Farmer of this contract              =====> ", signer[1].address);
    console.log("Address of Distributor of this contract         =====> ", signer[2].address);
    console.log("Address of Retailer of this contract            =====> ", signer[3].address);
    console.log("Address of Consumer of this contract            =====> ", signer[4].address);

  });
  it("******** 2. Produce Item By Farmer ********", async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await supplychain.connect(signer[1]).produceItemByFarmer(123, "Ram", "this is my farm", "30.000", "30.000", "this is the product", ethers.parseEther("1"));
    await printdetail();
    console.log("SUCCESSFULLY PRODUCT ITEM BY FARMER")
  });
  it("******** 3. Produce Item By Farmer ********", async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await supplychain.connect(signer[1]).produceItemByFarmer(123, "Ram", "this is my farm", "30.000", "30.000", "this is the product", ethers.parseEther("0.01"));
    await printdetail();
    console.log("SUCCESSFULLY PRODUCT ITEM BY FARMER")
  });
  it("********* 4. sell Item By Farmer **********", async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await supplychain.connect(signer[1]).produceItemByFarmer(123, "Ram", "this is my farm", "30.000", "30.000", "this is the product", ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[1]).sellItemByFarmer(123, ethers.parseEther("1"));
    await printdetail();
    console.log("SUCCESSFULLY SELL THE ITEM BY FARMER")
  })
  it("********* 5. Purchase Item By Distributor **********", async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await supplychain.connect(signer[1]).produceItemByFarmer(123, "Ram", "this is my farm", "30.000", "30.000", "this is the product", ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[1]).sellItemByFarmer(123, ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[2]).purchaseItemByDistributor(123);
    await printdetail();
    console.log("SUCCESSFULLY Purchase THE ITEM BY Distributor")
  })
  it("********* 6. Shipped Item By Farmer **********", async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await supplychain.connect(signer[1]).produceItemByFarmer(123, "Ram", "this is my farm", "30.000", "30.000", "this is the product", ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[1]).sellItemByFarmer(123, ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[2]).purchaseItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[1]).shippedItemByFarmer(123);
    await printdetail();
    console.log("SUCCESSFULLY Shipped THE ITEM BY Farmer")
  })
  it("********* 7. Received Item By Distributor **********", async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await supplychain.connect(signer[1]).produceItemByFarmer(123, "Ram", "this is my farm", "30.000", "30.000", "this is the product", ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[1]).sellItemByFarmer(123, ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[2]).purchaseItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[1]).shippedItemByFarmer(123);
    await printdetail();
    await supplychain.connect(signer[2]).receivedItemByDistributor(123);
    await printdetail();
    console.log("SUCCESSFULLY Received Item By Distributor")
  })
  it("********* 8. Processed Item By Distributor **********", async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await supplychain.connect(signer[1]).produceItemByFarmer(123, "Ram", "this is my farm", "30.000", "30.000", "this is the product", ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[1]).sellItemByFarmer(123, ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[2]).purchaseItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[1]).shippedItemByFarmer(123);
    await printdetail();
    await supplychain.connect(signer[2]).receivedItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[2]).processedItemByDistributor(123, ethers.parseEther('0.5'));
    await printdetail();
    console.log("SUCCESSFULLY Processed Item By Distributor")
  })
  it("********* 9. Package Item By Distributor **********", async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await supplychain.connect(signer[1]).produceItemByFarmer(123, "Ram", "this is my farm", "30.000", "30.000", "this is the product", ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[1]).sellItemByFarmer(123, ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[2]).purchaseItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[1]).shippedItemByFarmer(123);
    await printdetail();
    await supplychain.connect(signer[2]).receivedItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[2]).processedItemByDistributor(123, ethers.parseEther('0.5'));
    await printdetail();
    await supplychain.connect(signer[2]).packageItemByDistributor(123);
    await printdetail();
    console.log("SUCCESSFULLY Package Item By Distributor")
  })
  it("********* 10. Sell Item By Distributor **********", async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await supplychain.connect(signer[1]).produceItemByFarmer(123, "Ram", "this is my farm", "30.000", "30.000", "this is the product", ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[1]).sellItemByFarmer(123, ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[2]).purchaseItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[1]).shippedItemByFarmer(123);
    await printdetail();
    await supplychain.connect(signer[2]).receivedItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[2]).processedItemByDistributor(123, ethers.parseEther('0.5'));
    await printdetail();
    await supplychain.connect(signer[2]).packageItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[2]).sellItemByDistributor(123, ethers.parseEther('0.4'));
    console.log("SUCCESSFULLY Sell Item By Distributor")
  })
  it("********* 11. Purchase Item By Retailer **********", async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await supplychain.connect(signer[1]).produceItemByFarmer(123, "Ram", "this is my farm", "30.000", "30.000", "this is the product", ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[1]).sellItemByFarmer(123, ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[2]).purchaseItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[1]).shippedItemByFarmer(123);
    await printdetail();
    await supplychain.connect(signer[2]).receivedItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[2]).processedItemByDistributor(123, ethers.parseEther('0.5'));
    await printdetail();
    await supplychain.connect(signer[2]).packageItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[2]).sellItemByDistributor(123, ethers.parseEther('0.4'));
    await printdetail();
    await supplychain.connect(signer[3]).purchaseItemByRetailer(123, {
      value: ethers.parseEther("0.4")
    });
    await printdetail();
    console.log("SUCCESSFULLY Purchase Item By Retailer")
  })
  it("********* 12. hipped Item By Distributor **********", async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await supplychain.connect(signer[1]).produceItemByFarmer(123, "Ram", "this is my farm", "30.000", "30.000", "this is the product", ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[1]).sellItemByFarmer(123, ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[2]).purchaseItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[1]).shippedItemByFarmer(123);
    await printdetail();
    await supplychain.connect(signer[2]).receivedItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[2]).processedItemByDistributor(123, ethers.parseEther('0.5'));
    await printdetail();
    await supplychain.connect(signer[2]).packageItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[2]).sellItemByDistributor(123, ethers.parseEther('0.4'));
    await printdetail();
    await supplychain.connect(signer[3]).purchaseItemByRetailer(123, {
      value: ethers.parseEther("0.4")
    });
    await printdetail();
    await supplychain.connect(signer[2]).shippedItemByDistributor(123);
    await printdetail();
    console.log("SUCCESSFULLY Shipped Item By Distributor")
  })
  it("********* 13. Received Item By Retailer **********", async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await supplychain.connect(signer[1]).produceItemByFarmer(123, "Ram", "this is my farm", "30.000", "30.000", "this is the product", ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[1]).sellItemByFarmer(123, ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[2]).purchaseItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[1]).shippedItemByFarmer(123);
    await printdetail();
    await supplychain.connect(signer[2]).receivedItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[2]).processedItemByDistributor(123, ethers.parseEther('0.5'));
    await printdetail();
    await supplychain.connect(signer[2]).packageItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[2]).sellItemByDistributor(123, ethers.parseEther('0.4'));
    await printdetail();
    await supplychain.connect(signer[3]).purchaseItemByRetailer(123, {
      value: ethers.parseEther("0.4")
    });
    await printdetail();
    await supplychain.connect(signer[2]).shippedItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[3]).receivedItemByRetailer(123);
    await printdetail();
    console.log("SUCCESSFULLY Received Item By Retailer")
  })
  it("********* 14. Sell Item By Retailer **********", async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await supplychain.connect(signer[1]).produceItemByFarmer(123, "Ram", "this is my farm", "30.000", "30.000", "this is the product", ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[1]).sellItemByFarmer(123, ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[2]).purchaseItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[1]).shippedItemByFarmer(123);
    await printdetail();
    await supplychain.connect(signer[2]).receivedItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[2]).processedItemByDistributor(123, ethers.parseEther('0.5'));
    await printdetail();
    await supplychain.connect(signer[2]).packageItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[2]).sellItemByDistributor(123, ethers.parseEther('0.4'));
    await printdetail();
    await supplychain.connect(signer[3]).purchaseItemByRetailer(123, {
      value: ethers.parseEther("0.4")
    });
    await printdetail();
    await supplychain.connect(signer[2]).shippedItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[3]).receivedItemByRetailer(123);
    await printdetail();
    await supplychain.connect(signer[3]).sellItemByRetailer(123, ethers.parseEther("0.4"))
    await printdetail();
    console.log("SUCCESSFULLY Sell Item By Retailer")
  })
  it("********* 15. Purchase Item By Consumer **********", async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await supplychain.connect(signer[1]).produceItemByFarmer(123, "Ram", "this is my farm", "30.000", "30.000", "this is the product", ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[1]).sellItemByFarmer(123, ethers.parseEther("1"));
    await printdetail();
    await supplychain.connect(signer[2]).purchaseItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[1]).shippedItemByFarmer(123);
    await printdetail();
    await supplychain.connect(signer[2]).receivedItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[2]).processedItemByDistributor(123, ethers.parseEther('0.5'));
    await printdetail();
    await supplychain.connect(signer[2]).packageItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[2]).sellItemByDistributor(123, ethers.parseEther('0.4'));
    await printdetail();
    await supplychain.connect(signer[3]).purchaseItemByRetailer(123, {
      value: ethers.parseEther("0.4")
    });
    await printdetail();
    await supplychain.connect(signer[2]).shippedItemByDistributor(123);
    await printdetail();
    await supplychain.connect(signer[3]).receivedItemByRetailer(123);
    await printdetail();
    await supplychain.connect(signer[3]).sellItemByRetailer(123, ethers.parseEther("0.4"))
    await printdetail();
    await supplychain.connect(signer[4]).purchaseItemByConsumer(123, { value: ethers.parseEther("0.4") })
    await printdetail();
    console.log("SUCCESSFULLY Purchase Item By Consumer")
  })
});