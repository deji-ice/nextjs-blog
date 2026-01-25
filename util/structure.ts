import Iframe from "sanity-plugin-iframe-pane"
import type { DefaultDocumentNodeResolver } from 'sanity/desk'

export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
    // Only show preview pane on `movie` schema type documents
    switch (schemaType) {
        case `post`:
            return S.document().views([
                S.view.form(),
                S.view
                    .component(Iframe)
                    .options({
                        url:
                            process.env.NODE_ENV === "development"
                                ? "http://localhost:3000/api/preview"
                                : "https://www.thecodechronicles.tech/api/preview",
                        defaultSize: "desktop",
                        reload: { button: true },
                        attributes: {}
                    })
                    .title('Preview'),
            ])
    }

}