import { ref } from 'vue'

export default {
  name: 'xm-color-block',
  setup (props, { emit }) {
    emit('click')

    const a = ref(1)
    const b = new Array(10)
    const c = [
      ...Array.from(b).fill(1)
    ]
    const d = {
      name: 'ym',
      c
    }
    console.log(d?.age)

    return () => (
      <div v-model={a}>
        vvv
      </div>
    )
  }
}
