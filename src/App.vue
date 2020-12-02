<template>
  <div :class="space && space.skin" id="app" class="overflow-hidden">
    <UiLoading v-if="app.loading || !app.init" class="overlay big" />
    <div v-else>
      <Topnav />
      <div class="pb-6 overflow-hidden">
        <router-view :key="$route.path" class="flex-auto" />
      </div>
    </div>
    <Notifications />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ipfs from '@/helpers/ipfs';

export default {
  methods: {
    ...mapActions(['init']),
  },
  mounted() {
    this.init();
    this.$cookies.config('30d');
    console.log("======== this.$cookies.get('IPFSGATEWAY') ========" + this.$cookies.get('IPFSGATEWAY'))
    if (!this.$cookies.get('IPFSGATEWAY')) {
      this.$cookies.set('IPFSGATEWAY', process.env.VUE_APP_IPFS_NODE);
    }
    ipfs.setGateway(this.$cookies.get('IPFSGATEWAY'));
  },
  computed: {
    space() {
      try {
        return this.app.spaces[this.$route.params.key];
      } catch (e) {
        return {};
      }
    },
  },
};
</script>
