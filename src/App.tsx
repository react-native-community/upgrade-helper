import { BaseProvider, LightTheme } from "baseui"
import { Client as Styletron } from "styletron-engine-atomic"
import { Provider as StyletronProvider } from "styletron-react"
import { Home } from "./components/pages/Home"

const engine = new Styletron()

export const App = () => {
	return (
		<StyletronProvider value={engine}>
			<BaseProvider theme={LightTheme}>
				<Home />
			</BaseProvider>
		</StyletronProvider>
	)
}
