<template>
    <div class="section-list__card">
        <div class="section-list__card-heading d-flex justify-space-between">
            <div class="section-list__floor opacity5">{{card.floor}} этаж</div> 
            <div class="section-list__info">
                {{card.rooms}} {{roomText(card.rooms)}} <span class="opacity5 ml-md-1 mr-md-2">-</span> {{card.square}}м<sup>2</sup>
            </div>
        </div>
        <div class="section-list__card-body">
            <div class="section-list__card-id">№{{card.number}}</div>
            <img :src="card.plan" alt="">
        </div>
        <div class="section-list__card-footer text-right">
            <div class="section-list__card-price">{{card.price}} р.</div>
            <div class="section-list__card-price-detail opacity5">{{getPriceForSquare()}} р. за м<sup>2</sup></div>
        </div>
        <div class="section-list__card-btn">
            <button class="btn">Подробнее</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        card: {
            type: Object,
            required: true
        }
    },
    methods: {
        getPriceForSquare() {
            return Math.round(this.card.price / this.card.square)
        },
        roomText(x) {
            let res = '';
            switch(x) {
                case 1: res = 'комната'
                    break;
                case 2: res = 'комнаты'
                    break;
                case 3: res = 'комнаты'
                    break;
                case 4: res = 'комнаты'
                    break;
                default: res = 'комнат'
            }
            return res  
        }
    }
}
</script>