import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    parameters: {},
    roomsBtn: [
      {name: 'S', count: 4, isActive: false},
      {name: '1К', count: 1, isActive: false},
      {name: '2К', count: 2, isActive: false},
      {name: '3К', count: 3, isActive: false},
    ], 
    filteredCards: [],
    dataCards: [
      {
        building_id: 73,
        building_name: "1 этап 1а корпуса",
        floor: 10,
        id: 23329,
        is_studio: 1,
        number: "163",
        plan: "/img/bb8d/9eeb90d9c7aeeed41fb41c0b5e383013.jpg",
        porch: 3,
        price: 2956317,
        rooms: 1,
        size: "XS",
        square: 23.66,
      },
      {
        building_id: 74,
        building_name: "1 этап 1а корпуса",
        floor: 4,
        id: 20822,
        is_studio: 1,
        number: "163",
        plan: "/img/bb8d/9eeb90d9c7aeeed41fb41c0b5e383013.jpg",
        porch: 3,
        price: 2992701,
        rooms: 1,
        size: "XS",
        square: 23.87,
      },
      {
        building_id: 75,
        building_name: "1 этап 1а корпуса",
        floor: 4,
        id: 20382,
        is_studio: 1,
        number: "163",
        plan: "/img/bb8d/9eeb90d9c7aeeed41fb41c0b5e383013.jpg",
        porch: 3,
        price: 4952721,
        rooms: 2,
        size: "2k",
        square: 42.87,
      },
      {
        building_id: 75,
        building_name: "1 этап 1а корпуса",
        floor: 4,
        id: 20332,
        is_studio: 1,
        number: "163",
        plan: "/img/bb8d/9eeb90d9c7aeeed41fb41c0b5e383013.jpg",
        porch: 3,
        price: 8862732,
        rooms: 3,
        size: "3k",
        square: 42.87,
      },
      {
        building_id: 32,
        building_name: "1 этап 1а корпуса",
        floor: 10,
        id: 20328,
        is_studio: 1,
        number: "163",
        plan: "/img/bb8d/9eeb90d9c7aeeed41fb41c0b5e383013.jpg",
        porch: 3,
        price: 3956317,
        rooms: 1,
        size: "1k",
        square: 24.99,
      },
      {
        building_id: 37,
        building_name: "1 этап 1а корпуса",
        floor: 10,
        id: 20320,
        is_studio: 1,
        number: "163",
        plan: "/img/bb8d/9eeb90d9c7aeeed41fb41c0b5e383013.jpg",
        porch: 3,
        price: 3956317,
        rooms: 1,
        size: "XS",
        square: 24.99,
      },
      {
        building_id: 17,
        building_name: "1 этап 1а корпуса",
        floor: 10,
        id: 33320,
        is_studio: 1,
        number: "163",
        plan: "/img/bb8d/9eeb90d9c7aeeed41fb41c0b5e383013.jpg",
        porch: 3,
        price: 5956317,
        rooms: 1,
        size: "2k",
        square: 45.36,
      },
      {
        building_id: 87,
        building_name: "1 этап 1а корпуса",
        floor: 10,
        id: 33320,
        is_studio: 1,
        number: "163",
        plan: "/img/bb8d/9eeb90d9c7aeeed41fb41c0b5e383013.jpg",
        porch: 3,
        price: 9956317,
        rooms: 4,
        size: "4",
        square: 66.60,
      },
    ]
    
  },
  mutations: {
    ADD_COPY_DATA(state, copyData) {
      state.filteredCards = copyData
    },
    ADD_PARAMETERS(state, data) {
      state.parameters = data
    },
    UPDATE_FILTER(state, data) {
      state.filteredCards = data
    },
    UPDATE_BTN(state, data) {
      const current = state.roomsBtn.find(i => i.count === data.count);
      current.isActive = !data.isActive
    },
    RESET_ROMS_BTN(state) {
      state.roomsBtn.forEach(item => {
        item.isActive = false
      })
    }
  },
  actions: {
    FETCH_COPY_DATA({commit, state}) {
      const copyData = state.dataCards.map(a => ({...a}));
      commit('ADD_COPY_DATA', copyData);
    },
    GET_VALUES({commit, state}) {
      const floorMin = state.dataCards.sort((a,b) => a.floor - b.floor)[0].floor;
      const floorMax = state.dataCards.sort((a,b) => a.floor - b.floor)[state.dataCards.length - 1].floor;
      const minSquare = Math.floor(state.dataCards.sort((a, b) => a.square - b.square)[0].square);
      const maxSquare = Math.ceil(state.dataCards.sort((a,b) => a.square - b.square)[state.dataCards.length - 1].square);
      const minPrice = Math.floor(state.dataCards.sort((a, b) => a.price - b.price)[0].price);
      const maxPrice = Math.ceil(state.dataCards.sort((a,b) => a.price - b.price)[state.dataCards.length - 1].price)
      const floors = [floorMin, floorMax];
      const square = [minSquare, maxSquare];
      const price = [minPrice, maxPrice];
      const data = {floors, floorMin, floorMax, square, minSquare, maxSquare, price, minPrice, maxPrice};
      commit('ADD_PARAMETERS', data) 
    },
    FILTERED_CARDS({commit, state}, {
        priceMin = state.parameters.minPrice, 
        priceMax = state.parameters.maxPrice, 
        squareMin = state.parameters.minSquare, 
        squareMax = state.parameters.maxSquare, 
        floorMin = state.parameters.floorMin, 
        floorMax = state.parameters.floorMax,
        rooms
      }) {
        if(!rooms.length) {
          rooms = state.roomsBtn.map(btn => btn.count) 
        }
      let copyData = state.dataCards.map(a => ({...a}));
      
      copyData = copyData.filter(item => {
          return item.price >= priceMin && item.price <= priceMax &&
          item.square >= squareMin && item.square <= squareMax &&
          item.floor >= floorMin && item.floor <= floorMax &&
          rooms.find(room => room == item.rooms)
      })
      commit('UPDATE_FILTER', copyData)
    },
    UPDATE_ROOMS_BTN({commit}, btn) {
      commit('UPDATE_BTN', btn)
    },
    RESET_ROOMS_BTN({commit}) {
      commit('RESET_ROMS_BTN')
    }
  },
  getters: {
    CARDS(state) {
      return state.filteredCards
    },
    PARAMETERS(state) {
      return state.parameters
    },
    ROOMS_BTN(state) {
      return state.roomsBtn
    }
  }
})
