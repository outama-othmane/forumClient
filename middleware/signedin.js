export default function ({ store, redirect, route }) {
  if (!store.state.auth.loggedIn) {
	return redirect('/auth/signin?redirect=' + route.path)
  }
}