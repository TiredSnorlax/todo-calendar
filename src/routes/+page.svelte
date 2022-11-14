<script lang="ts">
	import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    onMount( () => {
        goto(`./${new Date().getFullYear()}`)
    })
</script>

<h1>Welcome to SvelteKit</h1>

<style global>
</style>
