export default function({ store, redirect }) {
    if (!store.state.auth.user.is_super_admin) {
      return redirect("/");
    }
  }