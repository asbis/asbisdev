<template>
    <!-- fab placed to the top and end and on the top edge of the content overlapping header -->
    <div :innerHTML="html" :class="padding ? 'ion-padding' : null"></div>
</template>
  
<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from 'vue';

export default defineComponent({
    name: 'RenderedHTMLComponent',
    props: {
        html: {
            type: String,
            default: '',
        },
        padding: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        const domparser = new DOMParser();

        const data = reactive({
            html: computed(() => parse(props.html))
        });

        function parse(html: string) {
            const doc = domparser.parseFromString(html, "text/html");

            // Endre "http://localhost:8080/uploads/large_Hjernen_1c02015133.png" til "https://hap.appfabrikken.no/uploads/large_Hjernen_1c02015133.png"
            Array.from(doc.querySelectorAll("img")).forEach((img: any) => {
                if (img.src.includes('/uploads/')) {
                    img.src = 'https://hap.appfabrikken.no/uploads/' + img.src.split('/uploads/')[1];
                    img.srcset = img.srcset.replaceAll('/uploads', 'https://hap.appfabrikken.no/uploads/');
                }
                console.log(img);
            });

            return doc.body.innerHTML;
        }

        return {
            ...toRefs(data)
        }
    },

    components: {}
});
</script>
  
<style scoped>

</style>
  