<template>
    <v-form >
        <v-row class="justify-space-between text-uppercase font-weight-bold text-caption form">
            <v-col class="col-12 col-sm-6 col-lg-2">
                <div class="form__heading">Комнаты</div>
                <div class="d-flex justify-space-between form__room-btns" >
                    <button 
                    class="form__inner-data form__room-btn font-weight-bold" 
                    v-for="btn in ROOMS_BTN" 
                    :key="btn.count" 
                    @click.prevent="addRoom(btn)" 
                    :class="{active: btn.isActive}">
                        {{btn.name}}
                    </button>
                </div>
            </v-col>
            <v-col class="col-12 col-sm-6 col-lg-2">
                <div class="form__heading">Этаж</div>
                <div class="d-flex justify-space-between form__inputs">
                    <div class="form__inner-data">
                        {{PARAMETERS.floors[0]}}
                    </div>
                    <div class="form__inner-data">
                        {{PARAMETERS.floors[1]}}
                    </div>
                </div>
                <v-range-slider @change="filterFloor"
                    v-model="PARAMETERS.floors"
                    :max="PARAMETERS.floorMax"
                    :min="PARAMETERS.floorMin"
                >
                </v-range-slider>
            </v-col>
            <v-col class="col-12 col-sm-6 col-lg-2">
                <div class="form__heading">Площадь, <span class="text-lowercase">м<sup>2</sup></span></div>
                <div class="d-flex justify-space-between form__inputs">
                    <div class="form__inner-data">
                        {{PARAMETERS.square[0]}}
                    </div>
                    <div class="form__inner-data">
                        {{PARAMETERS.square[1]}}
                    </div>
                </div>
                <v-range-slider
                    @change="filterSquare"
                    v-model="PARAMETERS.square"
                    :max="PARAMETERS.maxSquare"
                    :min="PARAMETERS.minSquare"
                >
                </v-range-slider>
            </v-col>
            <v-col class="col-12 col-sm-6 col-lg-2">
                <div class="form__heading">Стоимость, <span class="text-lowercase">млн. р.</span></div>
                <div class="d-flex justify-space-between form__inputs">
                    <div class="form__inner-data">
                        {{PARAMETERS.price[0]}}
                    </div>
                    <div class="form__inner-data">
                        {{PARAMETERS.price[1]}}
                    </div>
                </div>
                <v-range-slider @change="filterPrice"
                    v-model="PARAMETERS.price"
                    :max="PARAMETERS.maxPrice"
                    :min="PARAMETERS.minPrice"
                >
                </v-range-slider>
            </v-col>
            <v-col class="col-12 col-sm-6 col-lg-2">
                <button type="submit" class="btn form__btn" @click.prevent="FILTERED_CARDS(filterData)">Применить</button>
                <div class="form__reset-btn text-center" @click.prevent="resetFilter()">сбросить фильтр</div>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'Form',
    data() {
        return {     
            filterData: {
                rooms: []
            }
        }
    },
    computed: {
        ...mapGetters(['CARDS', 'PARAMETERS', 'ROOMS_BTN']),
    },
    methods: {
        ...mapActions(['FETCH_COPY_DATA', 'FILTERED_CARDS', 'UPDATE_ROOMS_BTN', 'GET_VALUES', 'RESET_ROOMS_BTN']),
        addRoom(btn) {
            if(!btn.isActive) {
                this.filterData['rooms'].push(btn.count);
            } else {
                this.filterData['rooms'].forEach((item, i) => {
                    if(btn.count == item) {
                        this.filterData['rooms'].splice(i, 1)
                    }  
                })
            } 
            btn.isActive != btn.isActive;
            this.UPDATE_ROOMS_BTN(btn);
        },
        filterFloor() {
            this.filterData.floorMin = this.PARAMETERS.floors[0];
            this.filterData.floorMax = this.PARAMETERS.floors[1];
        },
        filterSquare() {
            this.filterData.squareMin = this.PARAMETERS.square[0];
            this.filterData.squareMax = this.PARAMETERS.square[1];
        },
        filterPrice() {
            this.filterData.priceMin = this.PARAMETERS.price[0];
            this.filterData.priceMax = this.PARAMETERS.price[1];
        },
        resetFilter() {  
            this.GET_VALUES();
            this.FETCH_COPY_DATA();
            this.RESET_ROOMS_BTN()
        }
    }
}
</script>

<style lang="sass">
    .form
        &__inner-data
            width: calc(50% - 7.5px)
            font-size: 16px
            font-weight: normal
            background: #FFFFFF
            border: 1px solid #D8D8D8
            box-sizing: border-box
            border-radius: 5px
            display: flex
            align-items: center
            justify-content: center
            height: 40px
        &__inputs
            position: relative
            &:before
                content: "-",
                position: absolute
                left: 50%
                opacity: .5
                top: 50%
                transform: translate(-50%, -50%)
        &__heading
            margin-bottom: 5px
        &__btn
            margin-top: 25px
        &__room-btn
            width: calc(25% - 2px)
            cursor: pointer
            outline: none
            transition: .3s
            &.active
                background: #70D24E
                color: #fff
        &__reset-btn
            margin: 5px auto 0
            font-weight: bold
            font-size: 10px
            width: max-content
            cursor: pointer
            border-bottom: 1px solid #70D24E 
    .v-application .primary
        border-radius: 16px
        width: 16px
        height: 16px
        cursor: pointer
    .v-slider__thumb:before
        display: none
</style>