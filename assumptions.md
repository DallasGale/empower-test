# Assumptions

## Mutating user data

I have implemented MobX to enable mutating the state of Categories. The mutations include CRUD actions. Ideally, these mutations would be pushed to the database during the session.

I also like the idea of having Toast message popups that would indicate any changes to data. I would position them in the top right-hand corner of the screen.

## Loading state

In a real app, I would have loading state indicators in places such as the CRUD modals when confirming a change.

## Adding category icons/emojis

This would be useful to quickly glance at the list and see an icon or emoji that is assigned to a category. Up bank does this with a picker when you create a saver account.

## Going over the limit

If you spent over the limit set, it would be better to display this in the UI with a bit more sophistication than I have here. Perhaps you could click into the Category to see a more accurate scale of how much you have gone over.

## Session state

If you reload, you lose the current state of the app (e.g., you have to re-select the account). Ideally, this could be managed by using local storage or even query strings to maintain the state.
