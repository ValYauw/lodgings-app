<script>
import { mapActions } from 'pinia';
import { useSiteVarStore } from '@/stores/sitevar';

import DetailImage from '../components/composables/DetailImage.vue';
import LodgingSummaryTable from '../components/composables/LodgingSummaryTable.vue';
import Modal from '../components/composables/Modal.vue';

export default {
  name: 'DetailView',
  components: {
    DetailImage,
    LodgingSummaryTable,
    Modal
  },
  props: {
    id: String
  },
  data() {
    return {
      lodging: null,
      qr: null
    }
  }, 
  methods: {
    ...mapActions(useSiteVarStore, ['getLodgingById', 'generateQrCode', 'addBookmark', 'removeBookmark']),
    async showQRCode() {
      let url = window.location.origin + this.$route.path;
      console.log(url);
      this.qr = await this.generateQrCode(url, this.lodging.name);
      document.querySelector('.modal').style.display = "block";
    },
    clickedAddBookmark() {
      this.addBookmark(this.lodging.id);
      this.lodging.isBookmarked = true;
    },
    clickedRemoveBookmark() {
      this.removeBookmark(this.lodging.id);
      this.lodging.isBookmarked = false;
    }
  },
  async created() {
    this.lodging = await this.getLodgingById(+this.id);
    this.$watch(() => this.$route.params, async (toParams, fromParams) => {
      this.lodging = await this.getLodgingById(+toParams);
      this.qr = null;
    });
  }
}
</script>

<template>

<section>

  <!-- <div class="ui placeholder" v-if="lodging === null">
    <div class="image header">
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <div class="paragraph">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </div> -->

  <h1 class="title">{{ lodging?.name }}</h1>

  <div class="ui stackable grid">
    <div class="ten wide column">
      <DetailImage 
        :imgUrl="lodging?.imgUrl" 
        :alt="lodging?.name"
        :isBookmarked="lodging?.isBookmarked"
        @generateQR="showQRCode"
        @clickedAddBookmark="clickedAddBookmark"
        @clickedRemoveBookmark="clickedRemoveBookmark"
      />
    </div>
    <div class="six wide column">

      <div class="content">

        <div class="ui tall stacked segment">
          <div class="description">
            <h5>Lodging Description</h5>
            <p>{{ lodging?.facility }}</p>
          </div>
        </div>

        <LodgingSummaryTable v-bind="lodging" />

      </div>

    </div>
  </div>

  <Modal :html="qr" />

</section>

</template>

<style scoped>

.title {
  font-size: 40px;
  border-bottom: 1px solid var(--txt-color);
}
.content {
  background-color: var(--bg-color-2);
  border-radius: 20px;
  padding: 20px;
  border: solid 1px var(--txt-color);
  box-shadow: 0px 8px 10px var(--txt-color);
  min-height: 100%;
  /* margin: 10px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.content > .ui.tall.stacked.segment {
  flex-grow: 1.5;
  width: 100%;
}
.ui.tall.stacked.segment {
  background-color: var(--fg-color-1) !important;
}
.description {
  padding: 10px 25px 0px 20px !important;
  white-space: pre-line;
}

</style>