<!-- IntList.vue -->
<template>

  <div ref="root" class="MagicList">
    <div class="fxgr-row ml-header">
      <div class="fxgr-column">
        <div class="fxgr-cell">
          magic list
        </div>
      </div>
    </div>
    <!-- controls -->
    <div class="fxgr-row">
      <div class="fxgr-column">
        <div class="fxgr-cell">
          Nothing Nested
        </div>
      </div>
      <div class="fxgr-column">
          <div class="fxgr-row">

            <div class="fxgr-column">
              <div class="fxgr-cell">
                Controls A - sort
                <div>
                  <!-- sortFields <pre v-text="sortFields"></pre> -->
                  sortDirection: <span v-if="!sortReverse">desc</span><span v-else>ascending</span>
                  <br>
                  selectedSortField: {{selectedSortField}}
                  <br>
                </div>

                <div>
                  
                  <button
                    @click="toggleSortDirection()">toggleSortDirection
                  </button>
                </div>
                <div>
                  <div v-for="field in sortFields">
                   <input type="radio" :id="field" :value="field" v-model="selectedSortField">
                   <label :for="field">{{ field }}</label>
                  </div>
                </div>

              </div>
            </div>

            <div class="fxgr-column">
              <div class="fxgr-cell">
                Controls B - filter
                <div>
                  <!-- need reset and -->
                  <!-- selected categories <pre v-text="selectedCategories"></pre> -->
                  <button
                    @click="resetSelectedCategories()">reset
                  </button>
                </div>
                <div>
                  <div v-for="category in pCategories">
                   <input type="checkbox" :id="category" :value="category" v-model="selectedCategories">
                   <label :for="category">{{ category }}</label>
                  </div>
                </div>

              </div>
            </div>

            <div class="fxgr-column">
              <div class="fxgr-cell">
                Controls C - search
              <sac-vinput v-slot="{ error }" :min="5" :max="10" :value="username">
                <input v-model="username" />
                <div v-if="error" class="error">
                  {{ error }}
                </div>
              </sac-vinput>
              </div>
            </div>


          </div>
      </div>
    </div>
    <!-- body -->
    <div v-for="pItem in pItems" :key="pItem.sID" class="fxgr-row">

      <div class="fxgr-column">
        <div class="fxgr-cell">
          title: {{pItem.title}}
        </div>
      </div>

      <div class="fxgr-column">
        <div class="fxgr-cell">
          category: {{pItem.category}}
        </div>
      </div>

    </div>
  </div>
</template>

<script>

  import { deepCopy, deepMerge, arrUtils, anSort } from 'utils';
  import { computed, reactive, ref, toRef, toRefs, onBeforeMount, onMounted, onBeforeUnmount } from 'vue';
  export default {
    components: {
    },
    setup() {



      function genSID() {
        var firstPart = (Math.random() * 46656) | 0;
        var secondPart = (Math.random() * 46656) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);
        return firstPart + secondPart;
      };



      /*
        INSTEAD OF USING PROPS FOR DATA USE A METHOD VIA REF
        we 
      */
      const root = ref(null);
      const state = reactive({
        compName: 'MagicList',
        pMeta: {
          categories: [],
          fields: []
        },
        pItems:[],
        selectedCategories: [],
        omittedFields: ['sID'],
        selectedSortField: '',
        sortReverse: false
      });


      // const fooRef = toRef(state, 'foo')

      // fooRef.value++
      // console.log(state.foo) // 2
      // state.foo++
      // console.log(fooRef.value) // 3


      // whole state as ref
      // const stateAsRefs = toRefs(state);
      // // The ref and the original property is "linked"
      // state.foo++
      // console.log(stateAsRefs.foo.value) // 2
      // stateAsRefs.foo.value++
      // console.log(state.foo) // 3



      const sortReverseComputed = computed(() => state.sortReverse);
      function toggleSortDirection() {
        if (state.selectedSortField === '') { return; }
        state.sortReverse = !state.sortReverse;
      };
      // const pItemsRef = toRef(state, 'pItems');
      const selectedCategoriesRef = toRef(state, 'selectedCategories');
      function resetSelectedCategories() {
        selectedCategoriesRef.value = [];
      };
      const pCategoriesComputed = computed(() => {
        if(!state.pMeta.hasOwnProperty('categories')) {
          return [];
        }
        return state.pMeta.categories;
         // let categories = self.pitems.map(item => item.category)
         // return [... new Set(categories)]
         // return _.uniq(sizes)
      });

      // sortFieldsFiltered
      const sortFieldsComputed = computed(() => {
        if(!state.pMeta.fields.length) {
          return [];
        }
        return state.pMeta.fields.filter(item => {
          return !state.omittedFields.includes(item)
        });
         // let categories = self.pitems.map(item => item.category)
         // return [... new Set(categories)]
         // return _.uniq(sizes)
      });

      const selectedSortFieldRef = toRef(state, 'selectedSortField');

      const pItemsComputed = computed(() => {
        if(!state.pItems.length) {
          return [];
        }
        let returnVal = [];
        // no filter
        if(!state.pMeta.categories.length || !state.selectedCategories.length) {
          returnVal = state.pItems;
        } else {
          returnVal = state.pItems.filter(item => {
            return state.selectedCategories.includes(item.category)
          });          
        }
        if(state.selectedSortField !== '') {
          returnVal = anSort(deepCopy(returnVal), {
            // sign would be if values have signs
            reverse: state.sortReverse,
            prop: state.selectedSortField,
            insensitive: true,
          });
        // testSort({ srcArr:deepCopy(state.pItems), reverse: false, propKey: 'position' });
        }        
        // sort here
        return returnVal;
      });


      function initResData(ctx){
        let { srcArr } = ctx;
        let resData = srcArr 
          .map(entry => {
            // console.log(entry);
            entry.sID = genSID();
            return entry;
          })
          .reduce((accumulator, item) => {
            // if (! currentValue.hasOwnProperty(key)) {
            //   // console.log('key not found in item',currentValue)
            //   (result['unsorted'] = result['unsorted'] || []).push(currentValue);
            // }
            // let itemKeys = Object.keys(item);
            if (!accumulator.meta.categories.includes(item.category)) {
              accumulator.meta.categories.push(item.category);
            }
            for (let field of Object.keys(item)) {
              if (!accumulator.meta.fields.includes(field)) {
                accumulator.meta.fields.push(field);
              }
            }
            accumulator.items.push(item)
            return accumulator;
          }, {
            meta: {
              categories: [],
              fields: []
            },
            items: []
        });
        return resData;
      };


      function testInit() {
        let testItems = [
          {
            title: "Jerry",
            position: 5,
            category: 'primitive'
          },
          {
            title: "Bucks Bunny",
            position: 1,
            category: 'primitive'
          },
          {
            title: "Mickey Mouse",
            position: 3,
            category: 'intermediate'
          },
          {
            title: "Sora",
            position: 2,
            category: 'advanced'
          },
          {
            title: "Noctis",
            position: 4,
            category: 'advanced'
          }
        ];
        let { meta, items } = initResData({srcArr: testItems});
        // console.log(pData);
        // pItemsRef.value = 
        // state.pItems = items;
        state.pItems = [...state.pItems, ...items];
        state.pMeta.categories = [...state.pMeta.categories, ...meta.categories];
        state.pMeta.fields = [...state.pMeta.fields, ...meta.fields];
      };
      onBeforeMount(() => {
        // set the data by assigning seen false to all items
        testInit();
      })
      onMounted(() => {
        // if (state.items.length) {
        //   initObserver();
        // }
        // the DOM element will be assigned to the ref after initial render
        // console.log(root.value); // this is your $el
        // console.log('demo-comp on mounted');
      })
      onBeforeUnmount(() => {
        // the DOM element will be assigned to the ref after initial render
        // console.log(root.value); // this is your $el
        // console.log('demo-comp on mounted');
      })
      return {
        root,
        pItems: pItemsComputed,
        pCategories: pCategoriesComputed,
        username: ref(''),
        selectedCategories: selectedCategoriesRef,
        resetSelectedCategories,
        sortFields: sortFieldsComputed,
        selectedSortField: selectedSortFieldRef,
        sortReverse: sortReverseComputed,
        toggleSortDirection
      }
    },
    data: () => ({
    }),
  };
</script>
<style scoped>
  .MagicList {
    box-shadow: inset 0px -16px 16px -16px rgba(0, 0, 0, 0.5);
    /*height: 100%;*/
    min-height: 128px;
    width: 100%;
    overflow-y: scroll;
    padding: 0;
    position: relative;
  }
  .MagicList::after {
    background-color: #fff;
    bottom: calc(-100% + 16px);
    content: "";
    display: block;
    height: 16px;
    position: absolute;
    width: 100%;
  }
  .ml-header {
  }
  .fxgr-cell {
    padding: 15px;
    color: #595CA1;
    font-family: 'Helvetica Neue', 'Lucida Grande', 'Arial', sans-serif;
    font-size: 1.3em;
  }
  
  .error { color: red; }
</style>