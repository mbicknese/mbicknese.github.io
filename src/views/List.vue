<template>
  <section class="list-view">
    <div class="loading" v-if="loading">loading...</div>
    <div class="no-content" v-else-if="filteredList.length === 0">nothing...</div>
    <ol v-else class="list">
      <li v-for="{ title, path, date } in filteredList" :key="path" class="list-item">
        <router-link :to="'/post/' + path" class="item-title">
          {{ title }}
        </router-link>
        <br>
        <time pubdate="pubdate" :datetime="date | formatDate" :title="date | formatDate" class="item-date">{{ date | timeago }}</time>
      </li>
    </ol>
  </section>
</template>

<script>
  import api from '../api'
  import conf from '../config'
  import { strategy } from '../router'

  export default {
    name: 'listView',

    data () {
      return {
        lists: [],
        loading: true
      }
    },

    computed: {
      filteredList () {
        let keyword = ''
        if (this.$route) {
          keyword = (this.$route.query.q || '').toLowerCase()
        }
        // Filter by title, Order by publish date, desc
        return this.lists
          .map(item => { item.path = strategy.filenameToUrl(item.name); return item })
          .filter(item => (item.title.toLowerCase().indexOf(keyword) !== -1))
          .sort((itemA, itemB) => (new Date(itemB.date) - new Date(itemA.date)))
      }
    },

    created () {
      this.loadList()
    },

    methods: {
      loadList () {
        this.loading = true
        window.document.title = conf.blogTitle
        api.getList()
          .then(lists => {
            this.loading = false
            this.lists = lists
          })
          .catch(err => {
            this.loading = false
            console.error(err)
          })
      }
    },

    watch: {
      '$route': 'loadList'
    }

  }
</script>
