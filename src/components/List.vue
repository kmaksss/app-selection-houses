<template>
    <section class="section-list"> 
        <v-container>
            <v-row class="section-list__cards" v-if="CARDS.length"> 
                <v-col 
                    class="col-12 col-sm-6 col-lg-3"
                    v-for="(card, i) in CARDS"
                    :key="i"
                >
                    <Card :card="card"/>
                </v-col>
            </v-row>
            <p class="text-center" v-else>Объекты не найдены</p>
        </v-container>
    </section>
</template>

<script>
import Card from './Card'
import { mapGetters } from 'vuex'
export default {
    name: 'List',
    components: {Card},
    computed: {
        ...mapGetters(['CARDS'])
    },
}
</script>

<style lang="sass">
    .section-list
        &__card
            background: #FFFFFF
            box-shadow: 0px 5px 20px rgba(86, 86, 86, 0.05)
            border-radius: 10px
            font-size: 12px
            line-height: 28px
            font-weight: bold
            color: #2C323A
            padding: 5px 10px 0
            transition: .3s
            min-height: 368px
            position: relative
            &:hover
                box-shadow: 0px 5px 20px rgba(86, 86, 86, 0.25)

                .section-list
                    &__card
                        min-height: 430px
                        &-body
                            height: 200px
                        &-btn
                            z-index: 1
                            opacity: 1
            &-heading
                padding: 0 5px 5px
            &-body
                display: flex
                align-items: center
                justify-content: center
                height: 250px
                border: 1px solid #EBEBEB
                border-radius: 5px
                position: relative
                overflow: hidden
                padding: 30px 0
                transition: .2s
                img
                    max-width: 100%
                    max-height: 100%
            &-id
                position: absolute
                top: -1px
                right: -1px
                padding: 5px 10px
                background: #FFFFFF
                border: 1px solid #EBEBEB
                border-radius: 0px 5px
                z-index: 2
            &-footer
                padding: 11px 5px
            &-price
                font-size: 1.4rem
            &-btn
                position: absolute
                bottom: 10px
                left: 10px
                right: 10px
                width: auto
                z-index: -1
                opacity: 0
                transition: .3s
</style>