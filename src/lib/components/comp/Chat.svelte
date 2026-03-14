<script lang="ts">
	const { data } = $props()

	import { onMount } from 'svelte'
	import { Separator } from '$lib/components/ui/separator'
	import { Button } from '$lib/components/ui/button'
	import { Textarea } from '$lib/components/ui/textarea'
	import * as Dialog from '$lib/components/ui/dialog'
	import * as ScrollArea from '$lib/components/ui/scroll-area'
	import {
		MessageCircle,
		LogOut,
		LogIn,
		SendHorizontal,
		Lock,
		Smile,
		Paperclip
	} from 'lucide-svelte'

	// ── Auth state ──────────────────────────────────────────────────────────────
	let showAuthDialog = $state( false )
	let inputValue = $state( '' )

	const user = $derived( data.user )

	function loginWithGoogle() {
		window.location.href = '/auth/google'
	}

	function loginWithGithub() {
		window.location.href = '/auth/github'
	}

	function logout() {
		window.location.href = '/auth/logout'
	}

	// ── Date ─────────────────────────────────────────────────────────────────────
	function getTodayLabel() {
		const now = new Date()

		const formatter = new Intl.DateTimeFormat( 'en-US', {
			month: 'long',
			day: 'numeric'
		} )

		return `Today, ${formatter.format( now )}`
	}

	// ── Types ────────────────────────────────────────────────────────────────────
	type Reaction = { emoji: string; count: number };
	type Attachment = { name: string; size: string; type: string };
	type Message = {
		id: string;
		author: string;
		initials: string;
		avatar?: string;
		color: string;
		time: string;
		text: string;
		isAdmin?: boolean;
		reactions?: Reaction[];
		attachment?: Attachment;
		online?: boolean;
	};

	type DBMessage = {
		id: string;
		text: string;
		createdAt: string;
		user: {
			name: string;
			initials: string;
			avatar?: string;
		};
	};

	// ── Seed data ────────────────────────────────────────────────────────────────
	let messages: Message[] = $state( [] )

	onMount( async () => {
		try {
			const res = await fetch( '/api/messages' )

			if ( !res.ok ) return

			const data: DBMessage[] = await res.json()

			messages = data.map( ( m ) => ( {
				id: m.id,
				author: m.user.name,
				initials: m.user.initials,
				avatar: m.user.avatar,
				color: '#e11d48',
				time: new Date( m.createdAt ).toLocaleTimeString( 'id-ID', {
					hour: '2-digit',
					minute: '2-digit'
				} ),
				text: m.text,
				online: true
			} ) )
		} catch ( err ) {
			console.error( 'Failed to load messages', err )
		}
	} )

	async function sendMessage() {
		if ( !user || !inputValue.trim() ) return

		const res = await fetch( '/api/messages', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify( { content: inputValue } )
		} )

		if ( !res.ok ) return

		const message = await res.json()

		messages = [
			...messages,
			{
				id: message.id,
				author: message.user.name,
				initials: message.user.initials,
				avatar: message.user.avatar,
				color: '#e11d48',
				time: new Date( message.createdAt ).toLocaleTimeString( 'id-ID', {
					hour: '2-digit',
					minute: '2-digit'
				} ),
				text: message.text,
				online: true
			}
		]

		inputValue = ''
	}

	function handleKeydown( e: KeyboardEvent ) {
		if ( e.key === 'Enter' && !e.shiftKey ) {
			e.preventDefault()
			sendMessage()
		}
	}

	function isContinuation( i: number ) {
		return i > 0 && messages[i].author === messages[i - 1].author
	}
</script>

<!-- ── Auth Dialog ─────────────────────────────────────────────────────────── -->
<Dialog.Root bind:open={showAuthDialog}>
	<Dialog.Content
		class="shadow-2xldark:border-zinc-800 max-w-sm rounded-2xl border border-zinc-200
		bg-white p-0 dark:bg-zinc-950"
	>
		<div
			class="relative overflow-hidden rounded-t-2xl bg-linear-to-br from-slate-50 via-slate-50
			to-slate-100 px-8 pt-10 pb-8
			dark:bg-linear-to-br dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800"
		>
			<div
				class="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-indigo-400/10
				blur-3xl dark:bg-indigo-600/20"
			></div>
			<div
				class="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-sky-400/10
				blur-2xl dark:bg-sky-500/10"
			></div>

			<div class="relative flex flex-col items-center gap-1 text-center">
				<div
					class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl
					bg-indigo-50 shadow-md ring-1 shadow-indigo-100 ring-indigo-200/70
					dark:bg-indigo-500/10 dark:shadow-indigo-950/40 dark:ring-indigo-400/20"
				>
					<MessageCircle class="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
				</div>
				<Dialog.Title class="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
					Sign in to Chat Room
				</Dialog.Title>
				<Dialog.Description class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
					Log in to start the conversation with the community.
				</Dialog.Description>
			</div>
		</div>

		<div class="flex flex-col gap-3 px-8 py-6">
			<!-- Google -->
			<Button
				onclick={loginWithGoogle}
				class="group flex w-full items-center justify-center gap-4 rounded-xl border border-zinc-200 bg-white px-6 py-4 
				text-base font-semibold text-zinc-800 transition-all hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.98]
				dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
			>
				<svg aria-hidden="true" class="h-6 w-6 shrink-0" viewBox="0 0 24 24">
					<path
						fill="#4285F4"
						d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
					/>
					<path
						fill="#34A853"
						d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
					/>
					<path
						fill="#FBBC05"
						d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
					/>
					<path
						fill="#EA4335"
						d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
					/>
				</svg>
				<span>Continue with Google</span>
			</Button>

			<!-- GitHub -->
			<Button
				onclick={loginWithGithub}
				class="group flex w-full items-center justify-center gap-4 rounded-xl border border-zinc-200 bg-white px-6 py-4 
				text-base font-semibold text-zinc-800 transition-all hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.98]
				dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
			>
				<svg
					aria-hidden="true"
					class="h-6 w-6 shrink-0 fill-zinc-800 dark:fill-white"
					viewBox="0 0 24 24"
				>
					<path
						d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
					/>
				</svg>
				<span>Continue with GitHub</span>
			</Button>

			<p class="mt-1 text-center text-xs text-zinc-400 dark:text-zinc-600">
				By signing in, you agree to our Terms and Conditions.
			</p>
		</div>
	</Dialog.Content>
</Dialog.Root>

<!-- ── Page Layout ─────────────────────────────────────────────────────────── -->
<section class="flex w-full justify-center px-4 pt-8 pb-16 sm:px-6">
	<div class="w-full max-w-4xl">
		<h1 class="text-center text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
			Chat Room
		</h1>
		<p class="mt-2 text-center text-sm text-zinc-500 dark:text-muted-foreground">
			Talk, share ideas, and stay connected with the community.
		</p>
		<Separator class="mx-auto mt-6 w-40" />

		<!-- Chat container -->
		<div
			class="mt-8 flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white
			shadow-xl shadow-zinc-100 transition-colors
			dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40"
			style="min-height: 600px;"
		>
			<!-- Top bar -->
			<div
				class="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/80 px-5
				py-3 backdrop-blur-sm
				dark:border-zinc-800 dark:bg-zinc-900/80"
			>
				<div class="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
					<MessageCircle class="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
					<span>Discussion</span>
				</div>
				<span class="hidden text-xs text-zinc-400 sm:block dark:text-zinc-500">
					General discussion for all workspace members
				</span>
				<div class="flex items-center gap-2">
					{#if user}
						<button
							onclick={logout}
							class="flex items-center gap-2 rounded-lg px-2 py-1 text-xs text-zinc-500
								transition-colors hover:bg-zinc-100 hover:text-zinc-900
								dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
						>
							<span>{user.name}</span>
							<LogOut class="h-3.5 w-3.5" />
						</button>
					{:else}
						<button
							onclick={() => ( showAuthDialog = true )}
							title="User"
							aria-label="Buka dialog login"
							class="rounded-lg p-1.5 text-black
								transition-colors hover:bg-zinc-100 hover:text-zinc-900
								dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
						>
							<svg
								aria-hidden="true"
								class="h-5 w-5"
								fill="none"
								stroke="currentColor"
								stroke-width="1.8"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
								/>
							</svg>
						</button>
					{/if}
				</div>
			</div>

			<!-- Date divider -->
			<div class="flex items-center gap-3 px-5 py-4">
				<div class="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"></div>

				<span class="text-xs text-zinc-400 dark:text-zinc-500">
					{getTodayLabel()}
				</span>

				<div class="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"></div>
			</div>

			<!-- Messages -->
			<ScrollArea.Root class="h-115 w-full px-5 pb-4" orientation="vertical">
				<div class="flex flex-col gap-0.5">
					{#each messages as msg, i ( msg.id )}
						{@const cont = isContinuation( i )}
						<div
							class="group flex items-start gap-3 rounded-lg px-2 py-1 transition-colors
							hover:bg-zinc-50 dark:hover:bg-zinc-900/60
							{cont ? 'mt-0' : 'mt-4'}"
						>
							<!-- Avatar -->
							<div class="relative h-9 w-9">
								{#if msg.avatar}
									<img
										src={msg.avatar}
										alt={msg.author}
										class="h-9 w-9 rounded-full object-cover"
									/>
								{:else}
									<div
										class="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
										style="background-color: {msg.color};"
									>
										<span aria-hidden="true">{msg.initials}</span>
									</div>
								{/if}

								{#if msg.online !== undefined}
									<span
										class="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-zinc-950
										{msg.online ? 'bg-emerald-400' : 'bg-zinc-400'}"
									></span>
								{/if}
							</div>

							<!-- Content -->
							<div class="min-w-0 flex-1">
								{#if !cont}
									<div class="mb-0.5 flex items-baseline gap-2">
										<span class="text-sm font-semibold text-zinc-900 dark:text-white"
											>{msg.author}</span
										>
										{#if msg.isAdmin}
											<span
												class="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider
												text-indigo-600 uppercase
												dark:bg-indigo-600/20 dark:text-indigo-400"
											>
												Admin
											</span>
										{/if}
										<span class="text-xs text-zinc-400 dark:text-zinc-600">{msg.time}</span>
									</div>
								{/if}

								<p class="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{msg.text}</p>

								<!-- Attachment -->
								{#if msg.attachment}
									<div
										class="mt-2 flex w-64 items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50
										px-3 py-2.5
										dark:border-zinc-700 dark:bg-zinc-900"
									>
										<div
											class="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-800"
										>
											<svg
												aria-hidden="true"
												class="h-5 w-5 text-zinc-500 dark:text-zinc-400"
												fill="none"
												stroke="currentColor"
												stroke-width="1.8"
												viewBox="0 0 24 24"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
												/>
											</svg>
										</div>
										<div class="min-w-0">
											<p class="truncate text-xs font-medium text-zinc-900 dark:text-white">
												{msg.attachment.name}
											</p>
											<p class="text-[11px] text-zinc-400 dark:text-zinc-500">
												{msg.attachment.size} · {msg.attachment.type}
											</p>
										</div>
									</div>
								{/if}

								<!-- Reactions -->
								{#if msg.reactions?.length}
									<div class="mt-1.5 flex flex-wrap gap-1.5">
										{#each msg.reactions as r ( r.emoji )}
											<button
												aria-label="Reaksi {r.emoji}, {r.count} orang"
												class="flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-2 py-0.5
													text-xs transition-colors hover:border-zinc-300 hover:bg-zinc-50
													dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
											>
												<span aria-hidden="true">{r.emoji}</span>
												<span class="font-medium text-zinc-600 dark:text-zinc-300">{r.count}</span>
											</button>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</ScrollArea.Root>

			<!-- Input bar -->
			<div
				class="border-t border-zinc-100 bg-zinc-50/80
				px-4 py-3
				dark:border-zinc-800 dark:bg-zinc-900/60"
			>
				{#if !user}
					<Button
						variant="outline"
						onclick={() => ( showAuthDialog = true )}
						class="flex w-full items-center gap-3 rounded-xl border-dashed
						text-sm text-zinc-400 hover:border-indigo-200/60 hover:text-zinc-500
						dark:hover:border-zinc-500 dark:hover:text-zinc-400"
					>
						<Lock class="h-4 w-4 shrink-0" />

						<span>Log In to send a message...</span>

						<LogIn class="h-4 w-4 shrink-0" />
					</Button>
				{:else}
					<div class="flex items-center gap-2">
						<Button
							variant="ghost"
							size="icon"
							aria-label="Tambah emoji"
							class="shrink-0 p-1 text-zinc-400
							hover:bg-zinc-200 hover:text-zinc-700
							dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
						>
							<Paperclip class="h-5 w-5" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							aria-label="Tambah emoji"
							class="shrink-0 p-1 text-zinc-400
							hover:bg-zinc-200 hover:text-zinc-700
							dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
						>
							<Smile class="h-5 w-5" />
						</Button>
						<Textarea
							bind:value={inputValue}
							onkeydown={handleKeydown}
							placeholder="Send a message..."
							rows={1}
							class="min-h-9 flex-1 resize-none border border-zinc-200 
							bg-zinc-50 px-3 py-1.5 text-sm placeholder:text-zinc-400 focus-visible:ring-0
							dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-500"
						/>
						<Button
							onclick={sendMessage}
							disabled={!inputValue.trim()}
							aria-label="Kirim pesan"
							class="shrink-0 rounded-lg p-2 text-white hover:bg-black"
						>
							<SendHorizontal class="h-4 w-4 translate-x-0.5" />
						</Button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
