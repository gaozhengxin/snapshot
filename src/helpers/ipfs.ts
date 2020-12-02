class Client {
  gateway = ""
  get(ipfsHash) {
    const addr = this.gateway == "" ? process.env.VUE_APP_IPFS_NODE : this.gateway;
    const url = `https://${addr}/ipfs/${ipfsHash}`;
    return fetch(url).then(res => res.json());
  }
  getGateway() {
    return this.gateway == "" ? process.env.VUE_APP_IPFS_NODE : this.gateway;
  }
  setGateway(ipfsgateway){
    this.gateway = ipfsgateway;
  }
}

const client = new Client();

export default client;
