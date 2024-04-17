require([    //Configuration using the nlcs portal
    "esri/config",
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/Legend",
    "esri/widgets/ScaleBar",
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery",
    "esri/core/reactiveUtils",
    "esri/widgets/Home",
    "esri/widgets/Locate",
    "esri/widgets/LayerList"
    //"esri/widgets/Legend"

],
    function (esriConfig, WebMap, MapView, Legend, ScaleBar, Expand, BasemapGallery, reactiveUtils, Home, Locate, LayerList) {
        // Set the hostname to the on-premise portal
        esriConfig.portalUrl = "https://cgi.nlcs.gov.bt/portal"

        // Create a Map instance

        const myMap = new WebMap({
            portalItem: { // autocasts as new PortalItem()
                id: "a204abb6c7ff4eeaa98fe159b18813f8"// ID FROM THE ArcGIS Enterprise
            }
        });
        // Create a MapView instance (for 2D viewing) and reference the map instance 
        const view = new MapView({
            map: myMap,
            //zoom: 14, already set on the webmap in ArcGIS enterprise
            container: "viewDiv", // References the ID of a DOM element
            //center: [89.6386, 27.4716] // longitude, latitude
        });
        //  create and view legend
        //  let legend = new Legend({
        //  view: view
        // });
        // view.ui.add(legend, "bottom-left");


        let scaleBar = new ScaleBar({
            view: view
        });
        // Add widget to the bottom left corner of the view
        view.ui.add(scaleBar, "bottom-right");

        const basemapGallery = new BasemapGallery({
            view: view,
            container: document.createElement("div")
        });

        // Create an Expand instance and set the content
        // property to the DOM node of the basemap gallery widget
        // Use an Esri icon font to represent the content inside
        // of the Expand widget

        const bgExpand = new Expand({
            view: view,
            content: basemapGallery
        });

        // close the expand whenever a basemap is selected
        // on mobile devices
        reactiveUtils.watch(
            () => basemapGallery.activeBasemap,
            () => {
                const mobileSize = view.heightBreakpoint === "xsmall" || view.widthBreakpoint === "xsmall";

                if (mobileSize) {
                    bgExpand.collapse();
                }
            }
        );

        // Add the expand instance to the ui

        view.ui.add(bgExpand, "top-right");

        const homeBtn = new Home({
            view: view
        });

        // Add the home button to the top left corner of the view
        view.ui.add(homeBtn, "top-left");
        const locateBtn = new Locate({
            view: view
        });

        // Add the locate widget to the top left corner of the view
        view.ui.add(locateBtn, {
            position: "top-left"
        });
        // LEGEND //
        const legend = new Legend({
            view: view,
            container: "legend-container"
        });
        //Layer list
        const layerList1 = new LayerList({
            view: view,
            container: "layerlist-container"

        });
        // MODALS //
        const appDetailModalBtn = document.getElementById("app-details-action");
        const appDetailModalEl = document.getElementById("app-details-modal");
        appDetailModalBtn.addEventListener("click", () => { appDetailModalEl.open = !appDetailModalEl.open });

    });
