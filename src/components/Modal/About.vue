<template>
  <UiModal :open="open" @close="$emit('close')">
    <!--
    <h3 class="m-4 text-center">About</h3>
    <div class="text-center">
      <a href="https://twitter.com/SnapshotLabs" target="_blank">
        <Icon size="32" name="twitter" class="mr-1 mx-2" />
      </a>
      <a href="https://discord.snapshot.page" target="_blank">
        <Icon size="32" name="discord" class="mr-1 mx-2" />
      </a>
      <a href="https://t.me/snapshotlabs" target="_blank">
        <Icon size="32" name="telegram" class="mr-1 mx-2" />
      </a>
      <a :href="`https://github.com/${pkg.repository}`" target="_blank">
        <Icon size="32" name="github" class="mr-1 mx-2" />
      </a>
      <a href="https://gitcoin.co/grants/1093/snapshot" target="_blank">
        <Icon size="32" name="loveit" class="mr-1 mx-2" />
      </a>
    </div>
    <div class="m-4 p-4 border rounded-2 text-white">
      <div class="d-flex">
        <span v-text="'Version'" class="flex-auto text-gray mr-1" />
        {{ pkg.version }}
      </div>
      <div class="d-flex">
        <span v-text="'License'" class="flex-auto text-gray mr-1" />
        {{ pkg.license }}
      </div>
      <div class="d-flex">
        <span v-text="'Network'" class="flex-auto text-gray mr-1" />
        {{ web3.network.network }} ({{ web3.network.chainId }})
      </div>
      <div class="d-flex">
        <span v-text="'Block number'" class="flex-auto text-gray mr-1" />
        <a
          :href="_explorer(web3.blockNumber, 'block')"
          target="_blank"
          class="float-right"
        >
          {{ $n(web3.blockNumber) }}
          <Icon name="external-link" class="ml-1" />
        </a>
      </div>
      <div class="d-flex">
        <span v-text="'IPFS server'" class="flex-auto text-gray mr-1" />
        <span class="hide-sm"
          ><input
            type="text"
            :placeholder="ipfsgateway"
            v-model="inputVal"
            v-on:input="handleSetIPFSGateway"
            value=""
        /></span>
        <UiButton
          @click="handleSetIPFSGateway"
          class="button-outline width-full mb-2"
        >
          Switch
        </UiButton>
        {{ ipfsNode }}
      </div>
      <div class="d-flex">
        <span v-text="'Hub'" class="flex-auto text-gray mr-1" />
        {{ hubUrl }}
      </div>
    </div>
    -->
    <h3 class="m-4 text-center">IPFS gateway</h3>
    <div class="text-center">
      <div class="d-flex">
        <span class="hide-sm"
          ><input
            type="text"
            :placeholder="ipfsNode"
            v-model="inputVal"
            value="ipfsNode"
            ref="ipfsgateway"
        /></span>
      </div>
      <div class="d-flex">
        <UiButton @click="handleSetIPFSGateway" class="button-outline mb-2">
          Apply
        </UiButton>
        <!--{{ ipfsNode }}-->
        <a
          href="https://ipfs.github.io/public-gateway-checker"
          target="_blank"
          class="mb-2 d-block"
        >
          <UiButton class="button-outline width-flex">
            Check public gateways
            <Icon name="external-link" class="ml-1" />
          </UiButton>
        </a>
      </div>
    </div>
  </UiModal>
</template>

<script>
import pkg from '@/../package.json';
import { mapActions } from 'vuex';
import ipfs from '@/helpers/ipfs';

export default {
  props: ['open'],
  data() {
    return {
      pkg,
      hubUrl: process.env.VUE_APP_HUB_URL,
      ipfsNode: this.$cookies.get('IPFSGATEWAY'),
    };
  },
  methods: {
    ...mapActions(['login', 'setIPFSGateway', 'getIPFSGateway']),
    handleSetIPFSGateway() {
      const gateway = this.$refs.ipfsgateway.value;
      ipfs.setGateway(gateway);
      this.$cookies.set('IPFSGATEWAY', gateway);
      this.$emit('close');
    },
  },
  async mounted() {
    await ipfs.getGateway().then((res) => {
      this.ipfsNode = res;
    });
  },
};
</script>
