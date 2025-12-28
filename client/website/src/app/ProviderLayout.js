"use client"

import { Provider } from "react-redux"
import { store } from "./redux/store/store"


export default function ProviderLayout({children}) {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}
