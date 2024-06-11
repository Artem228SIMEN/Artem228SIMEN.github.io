// Инициализация карты
var map,
  featureList,
  boroughSearch = [],
  objectSearch = [],
  museumSearch = [],
  eduSearch = [],
  libsSearch = [],
  profSearch = [],
  vlastSearch = [],
  markSearch = [];
  markSearch2 = [];
  markSearch3 = [];  
  markSearch4 = [];  
  vekSearch = [];
  visSearch = [];
  geincSearch = [];
  aviaSearch = [];
  tennerSearch = [];
  shubertSearch = [];
  nav1824Search = [];
  nav1924Search = [];
  nav1925Search = [];
  zone15Search = [];
  zone10Search = [];
  zone5Search = [];
  pointsSearch = [];


$(window).resize(function () {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function (e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

if (!("ontouchstart" in window)) {
  $(document).on("mouseover", ".feature-row", function (e) {
    highlight.clearLayers().addLayer(
      L.circleMarker(
        [$(this).attr("lat"), $(this).attr("lng")],
        highlightStyle
      )
    );
  });
}

$(document).on("mouseout", ".feature-row", clearHighlight);

// Кнопка окна справки
$("#about-btn").click(function () {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});
// Отдалить по размеру границ
$("#full-extent-btn").click(function () {
  map.fitBounds(boroughs.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});
$("#full-extent-btn2").click(function () {
  map.fitBounds(boroughs.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});
// Нивелировка Бауэра
$("#bayer-btn").click(function () {
  $("#bayerModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});
// Триангуляция Теннера
$("#tenner-btn").click(function () {
  $("#tennerModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});
// Триангуляция Шуберта
$("#shubert-btn").click(function () {
  $("#shubertModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});
// Вековые репера и пункт Кабози
$("#kaboz-btn").click(function () {
  $("#kabozModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});
// Нивелировка Савицкого
$("#savic-btn").click(function () {
  $("#savicModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});
// Нивелировка Гейнца
$("#geinc-btn").click(function () {
  $("#geincModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});
// Марки Витрама
$("#vitram-btn").click(function () {
  $("#vitramModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});
// Триангуляция Аэрохима
$("#avia-btn").click(function () {
  $("#aviaModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});
// Высотные доминанты
$("#visot-btn").click(function () {
  $("#visotModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});
// Кнопка окна легенды
$("#legend-btn").click(function () {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});
// Кнопка окна авторизации (отключено)
$("#login-btn").click(function () {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});
// Выпадающий список
$("#list-btn").click(function () {
  animateSidebar();
  return false;
});
// Кнопка навигации в мобильном режиме
$("#nav-btn").click(function () {
  $(".navbar-collapse").collapse("toggle");
  return false;
});
// Боковая панель
$("#sidebar-toggle-btn").click(function () {
  animateSidebar();
  return false;
});
$("#sidebar-hide-btn").click(function () {
  animateSidebar();
  return false;
});
function animateSidebar() {
  $("#sidebar").animate(
    {
      width: "toggle",
    },
    350,
    function () {
      map.invalidateSize();
    }
  );
}
// Переключатель слоёв
function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}
// Очистка подсветки
function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  // Скрыть боковую панель на маленьких экранах
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}
// Проходимся по слою и добавляем только те объекты, которые находятся в рамках видимости карты
function syncSidebar() {
  $("#feature-list tbody").empty();
  // Загружаем слои с указанными параметрами
  objects.eachLayer(function (layer) {
    if (map.hasLayer(objectLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append(
          '<tr class="feature-row" id="' +
            L.stamp(layer) +
            '" lat="' +
            layer.getLatLng().lat +
            '" lng="' +
            layer.getLatLng().lng +
            '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/lah.png"></td><td class="feature-name">' +
            layer.feature.properties.NAME +
            '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
        );
      }
    }
  });
  // Триангуляция Теннера
  tenner.eachLayer(function (layer) {
    if (map.hasLayer(tennerLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append(
          '<tr class="feature-row" id="' +
            L.stamp(layer) +
            '" lat="' +
            layer.getLatLng().lat +
            '" lng="' +
            layer.getLatLng().lng +
            '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/tenn.png"></td><td class="feature-name">' +
            layer.feature.properties.NAME +
            '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
        );
      }
    }
  });
  // Точки экскурсии
  points.eachLayer(function (layer) {
    if (map.hasLayer(pointsLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append(
          '<tr class="feature-row" id="' +
            L.stamp(layer) +
            '" lat="' +
            layer.getLatLng().lat +
            '" lng="' +
            layer.getLatLng().lng +
            '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/points.png"></td><td class="feature-name">' +
            layer.feature.properties.NAME +
            '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
        );
      }
    }
  });
  // Триангуляция Шуберта
  shubert.eachLayer(function (layer) {
    if (map.hasLayer(shubertLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append(
          '<tr class="feature-row" id="' +
            L.stamp(layer) +
            '" lat="' +
            layer.getLatLng().lat +
            '" lng="' +
            layer.getLatLng().lng +
            '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/shub.png"></td><td class="feature-name">' +
            layer.feature.properties.NAME +
            '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
        );
      }
    }
  });
  // Триангуляция Авиахима
  avia.eachLayer(function (layer) {
    if (map.hasLayer(aviaLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append(
          '<tr class="feature-row" id="' +
            L.stamp(layer) +
            '" lat="' +
            layer.getLatLng().lat +
            '" lng="' +
            layer.getLatLng().lng +
            '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/avia.png"></td><td class="feature-name">' +
            layer.feature.properties.NM +
            '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
        );
      }
    }
  });
  
  // Музеи
  museum.eachLayer(function (layer) {
    if (map.hasLayer(museumLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append(
          '<tr class="feature-row" id="' +
            L.stamp(layer) +
            '" lat="' +
            layer.getLatLng().lat +
            '" lng="' +
            layer.getLatLng().lng +
            '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/mus.png"></td><td class="feature-name">' +
            layer.feature.properties.NAME +
            '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
        );
      }
    }
  });
  // Учебные заведения
  edus.eachLayer(function (layer) {
    if (map.hasLayer(eduLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append(
          '<tr class="feature-row" id="' +
            L.stamp(layer) +
            '" lat="' +
            layer.getLatLng().lat +
            '" lng="' +
            layer.getLatLng().lng +
            '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/edu.png"></td><td class="feature-name">' +
            layer.feature.properties.NAME +
            '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
        );
      }
    }
  });
  // Библиотеки
  libs.eachLayer(function (layer) {
    if (map.hasLayer(libsLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append(
          '<tr class="feature-row" id="' +
            L.stamp(layer) +
            '" lat="' +
            layer.getLatLng().lat +
            '" lng="' +
            layer.getLatLng().lng +
            '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/lib.png"></td><td class="feature-name">' +
            layer.feature.properties.NAME +
            '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
        );
      }
    }
  });
  // Проф заведения
  profs.eachLayer(function (layer) {
    if (map.hasLayer(profLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append(
          '<tr class="feature-row" id="' +
            L.stamp(layer) +
            '" lat="' +
            layer.getLatLng().lat +
            '" lng="' +
            layer.getLatLng().lng +
            '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/niv.png"></td><td class="feature-name">' +
            layer.feature.properties.NAME +
            '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
        );
      }
    }
  });
  // Органы власти
  vlast.eachLayer(function (layer) {
    if (map.hasLayer(vlastLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append(
          '<tr class="feature-row" id="' +
            L.stamp(layer) +
            '" lat="' +
            layer.getLatLng().lat +
            '" lng="' +
            layer.getLatLng().lng +
            '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/vlast.png"></td><td class="feature-name">' +
            layer.feature.properties.NAME +
            '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
        );
      }
    }
  });
  // Марки Савицкого
  marks.eachLayer(function (layer) {
    if (map.hasLayer(markLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append(
          '<tr class="feature-row" id="' +
            L.stamp(layer) +
            '" lat="' +
            layer.getLatLng().lat +
            '" lng="' +
            layer.getLatLng().lng +
            '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/savic.png"></td><td class="feature-name">' +
            layer.feature.properties.NAME +
            '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
        );
      }
    }
  });
  // Насечки Савицкого
  marks2.eachLayer(function (layer) {
    if (map.hasLayer(markLayer2)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append(
          '<tr class="feature-row" id="' +
            L.stamp(layer) +
            '" lat="' +
            layer.getLatLng().lat +
            '" lng="' +
            layer.getLatLng().lng +
            '"><td style="vertical-align: middle;"><img width="18" height="9" src="assets/img/nasec.png"></td><td class="feature-name">' +
            layer.feature.properties.NAME +
            '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
        );
      }
    }
  });
  // Марки Витрама
  marks3.eachLayer(function (layer) {
    if (map.hasLayer(markLayer3)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append(
          '<tr class="feature-row" id="' +
            L.stamp(layer) +
            '" lat="' +
            layer.getLatLng().lat +
            '" lng="' +
            layer.getLatLng().lng +
            '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/vitr.png"></td><td class="feature-name">' +
            layer.feature.properties.NAME +
            '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
        );
      }
    }
  });  
  // Метки наводнений
  marks4.eachLayer(function (layer) {
    if (map.hasLayer(markLayer4)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append(
          '<tr class="feature-row" id="' +
            L.stamp(layer) +
            '" lat="' +
            layer.getLatLng().lat +
            '" lng="' +
            layer.getLatLng().lng +
            '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/bayer.png"></td><td class="feature-name">' +
            layer.feature.properties.NAME +
            '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
        );
      }
    }
  });  
  // Вековые реперы
  veks.eachLayer(function (layer) {
    if (map.hasLayer(vekLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append(
          '<tr class="feature-row" id="' +
            L.stamp(layer) +
            '" lat="' +
            layer.getLatLng().lat +
            '" lng="' +
            layer.getLatLng().lng +
            '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/vek.png"></td><td class="feature-name">' +
            layer.feature.properties.NAME +
            '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
        );
      }
    }
  });
  //Высотные доминанты
  viso.eachLayer(function (layer) {
    if (map.hasLayer(visLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append(
          '<tr class="feature-row" id="' +
            L.stamp(layer) +
            '" lat="' +
            layer.getLatLng().lat +
            '" lng="' +
            layer.getLatLng().lng +
            '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/dom.png"></td><td class="feature-name">' +
            layer.feature.properties.NAME +
            '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
        );
      }
    }
  });
  // Нивелировка Гейнца
  geinc.eachLayer(function (layer) {
    if (map.hasLayer(geincLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append(
          '<tr class="feature-row" id="' +
            L.stamp(layer) +
            '" lat="' +
            layer.getLatLng().lat +
            '" lng="' +
            layer.getLatLng().lng +
            '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/gein.png"></td><td class="feature-name">' +
            layer.feature.properties.NAME +
            '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
        );
      }
    }
  });
  // Обновляем список
  featureList = new List("features", {
    valueNames: ["feature-name"],
  });
  // Сортируем список по возрастанию
  featureList.sort("feature-name", {
    order: "asc",
  });
}

// Слои карты
// CartoDB
var cartoLight = L.tileLayer(
  "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
  }
);
// OpenStreetmap
var osmm = L.tileLayer(
  "http://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
  }
);
// 2GIS
var m2gis = L.tileLayer(
  "http://tile1.maps.2gis.com/tiles?x={x}&y={y}&z={z}",
  {
    maxZoom: 18,
  }
);
// ESRI World Topo
var esritp = L.tileLayer(
  "https://ngw.fppd.cgkipd.ru/tile/56/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
  }
);
// ESRI
var esri = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_map/mapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 19,
  }
);
// mapbox Streets
var mbstrt = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoidm9yb2Jpb3Zha3Jpc3RpbmEiLCJhIjoiY2x0NGZjb3AzMDFiYjJpbzNkdGYyMzhyYSJ9.YhxKc5Z5NVMCNrpVpbolSA",
  {
    maxZoom: 19,
  }
);
// mapbox Satellite
var mbx = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoidm9yb2Jpb3Zha3Jpc3RpbmEiLCJhIjoiY2x0NGZjb3AzMDFiYjJpbzNkdGYyMzhyYSJ9.YhxKc5Z5NVMCNrpVpbolSA",
  {
    opacity: 1.0,
    maxZoom: 19,
  }
);
// ESRI Satellite
var arconline = L.layerGroup([
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/mapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 19,
    }
  ),
]);

// Подсветка при наведении
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10,
};
// Границы Новокузнецка
var boroughs = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "#8b00ff",
      fill: false,
      weight: 3,
      opacity: 1,
      clickable: false,
    };
  },
  onEachFeature: function (feature, layer) {
    boroughSearch.push({
      name: layer.feature.properties.BoroName,
      source: "Boroughs",
      id: L.stamp(layer),
      bounds: layer.getBounds(),
    });
  },
});
$.getJSON("data/boroughs.geojson", function (data) {
  boroughs.addData(data);
});

// Зоны затопления
var nav1824 = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "#08672f",
      weight: 3,
      opacity: 1,
      clickable: false,
    };
  },
  onEachFeature: function (feature, layer) {
    nav1824Search.push({
      name: layer.feature.properties.NAME,
      source: "nav1824",
      id: L.stamp(layer),
      bounds: layer.getBounds(),
    });
  },
});
$.getJSON("data/1824.geojson", function (data) {
  nav1824.addData(data);
});

var nav1924 = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "#282d65",
      weight: 3,
      opacity: 0.3,
      clickable: false,
    };
  },
  onEachFeature: function (feature, layer) {
    nav1924Search.push({
      name: layer.feature.properties.NAME,
      source: "nav1924",
      id: L.stamp(layer),
      bounds: layer.getBounds(),
    });
  },
});
$.getJSON("data/1924.geojson", function (data) {
  nav1924.addData(data);
});
var nav1925 = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "#7c170f",
      weight: 3,
      opacity: 0.3,
      clickable: false,
    };
  },
  onEachFeature: function (feature, layer) {
    nav1925Search.push({
      name: layer.feature.properties.NAME,
      source: "nav1925",
      id: L.stamp(layer),
      bounds: layer.getBounds(),
    });
  },
});
$.getJSON("data/1925.geojson", function (data) {
  nav1925.addData(data);
});

// Зоны пешеходной доступности
var zone15 = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "#6dc998",
      weight: 3,
      opacity: 0.35,
      clickable: false,
    };
  },
  onEachFeature: function (feature, layer) {
    zone15Search.push({
      name: layer.feature.properties.contour,
      source: "zone15",
      id: L.stamp(layer),
      bounds: layer.getBounds(),
    });
  },
});
$.getJSON("data/15_zone.geojson", function (data) {
  zone15.addData(data);
});

var zone10 = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "#50c788",
      weight: 3,
      opacity: 0.6,
      clickable: false,
    };
  },
  onEachFeature: function (feature, layer) {
    zone10Search.push({
      name: layer.feature.properties.contour,
      source: "zone10",
      id: L.stamp(layer),
      bounds: layer.getBounds(),
    });
  },
});
$.getJSON("data/10_zone.geojson", function (data) {
  zone10.addData(data);
});

var zone5 = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "#32c97a",
      weight: 3,
      opacity: 1,
      clickable: false,
    };
  },
  onEachFeature: function (feature, layer) {
    zone5Search.push({
      name: layer.feature.properties.contour,
      source: "zone5",
      id: L.stamp(layer),
      bounds: layer.getBounds(),
    });
  },
});
$.getJSON("data/5_zone.geojson", function (data) {
  zone5.addData(data);
});

// Создание цветового словаря
var sColors = {
  1: "#ff3135",
  2: "#009b2e",
  3: "#ce06cb",
  A: "#fd9a00",
  B: "#ffff00",
  C: "#9ace00",
  D: "#6e6e6e",
  E: "#976900",
  F: "#969696",
};

var ExcColors = {
  1: "0000ff",
};

var exc = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "#0000ff",
      dashArray:'5, 10',
      weight: 4,
      opacity: 1,
      clickable: false,
    };
  },
  onEachFeature: function (feature, layer) {
    boroughSearch.push({
      name: layer.feature.properties.exc_name,
      source: "exc",
      id: L.stamp(layer),
      bounds: layer.getBounds(),
    });
  },
});
$.getJSON("data/exc.geojson", function (data) {
  exc.addData(data);
});

// Уникальные линейные сооружения
var sLines = L.geoJson(null, {
  style: function (feature) {
    return {
      color: '#e92000',
      weight: 3,
      opacity: 1,
    };
  },
  // Также указываем параметры для отображения при нажатии
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
        "<table class='table table-striped table-bordered table-condensed'>" +
        "<tr><th>Тип</th><td>" +
        feature.properties.Division +
        "</td></tr>" +
        "<tr><th>Название</th><td>" +
        feature.properties.Line +
        "</td></tr>" +
        "<tr><th>Изображение</th><td><img width=100% src=" +
        feature.properties.PHOTO +
        "></img></td></tr>" +
        "<tr><th>Описание</th><td>" +
        feature.properties.OPIS +
        "</td></tr>" +
        "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Line);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
        },
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1,
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        sLines.resetStyle(e.target);
      },
    });
  },
});
$.getJSON("data/kad.geojson", function (data) {
  sLines.addData(data);
});

// Улицы
var streets = L.geoJson(null, {
  style: function (feature) {
    return {
      color: '#0abf00',
      weight: 3,
      opacity: 1,
    };
  },
  // Также указываем параметры для отображения при нажатии
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
        "<table class='table table-striped table-bordered table-condensed'>" +        
        "<tr><th>Название</th><td>" +
        feature.properties.Line +
        "</td></tr>" +
        "<tr><th>Информация</th><td><a class='url-break' href='" +
        feature.properties.Division +
        "' target='_blank'>" +
        feature.properties.Division +
        "</a></td></tr>" +
        "<tr><th>Изображение</th><td><img width=100% src=" +
        feature.properties.PHOTO +
        "></img></td></tr>" +
        "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Line);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
        },
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1,
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        streets.resetStyle(e.target);
      },
    });
  },
});
$.getJSON("data/street.geojson", function (data) {
  streets.addData(data);
});

/* Управлеие образованием кластеров */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: true,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 15,
});

var objectLayer = L.geoJson(null);
var objects = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/lah.png",
        iconSize: [28, 38],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25],
      }),
      title: feature.properties.NAME,
      riseOnHover: true,
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
        "<table class='table table-striped table-bordered table-condensed'>" +
        "<tr><th>Название</th><td>" +
        feature.properties.NAME +
        "</td></tr>" +
        "<tr><th>Телефон</th><td>" +
        feature.properties.TEL +
        "</td></tr>" +
        "<tr><th>Адрес</th><td>" +
        feature.properties.ADDRESS1 +
        "</td></tr>" +
        "<tr><th>Сайт</th><td><a class='url-break' href='" +
        feature.properties.URL +
        "' target='_blank'>" +
        feature.properties.URL +
        "</a></td></tr>" +
        "<tr><th>Фото</th><td><img width=100% src=" +
        feature.properties.PHOTO +
        "></img></td></tr>" +
        "<tr><th>Описание</th><td>" +
        feature.properties.OPIS +
        "</td></tr>" +
        "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight
            .clearLayers()
            .addLayer(
              L.circleMarker(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                highlightStyle
              )
            );
        },
      });
      $("#feature-list tbody").append(
        '<tr class="feature-row" id="' +
          L.stamp(layer) +
          '" lat="' +
          layer.getLatLng().lat +
          '" lng="' +
          layer.getLatLng().lng +
          '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/lah.png"></td><td class="feature-name">' +
          layer.feature.properties.NAME +
          '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
      );
      objectSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADDRESS1,
        source: "objects",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0],
      });
    }
  },
});
$.getJSON("data/objects.geojson", function (data) {
  objects.addData(data);
  map.addLayer(objectLayer);
});

var shubertLayer = L.geoJson(null);
var shubert = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/shub.png",
        iconSize: [28, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25],
      }),
      title: feature.properties.NAME,
      riseOnHover: true,
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
      "<table class='table table-striped table-bordered table-condensed'>" +
      "<tr><th>Название</th><td>" +
      feature.properties.NAME +
      "</td></tr>" +
      "<tr><th>Адрес</th><td>" +
      feature.properties.ADR +
      "</td></tr>" +
      "<tr><th>Описание пункта</th><td>" +
      feature.properties.PUN +
      "</td></tr>" +
      "<tr><th>Фото</th><td><img width=100% src=" +
      feature.properties.PIC +
      "></img></td></tr>" +
      "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight
            .clearLayers()
            .addLayer(
              L.circleMarker(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                highlightStyle
              )
            );
        },
      });
      $("#feature-list tbody").append(
        '<tr class="feature-row" id="' +
          L.stamp(layer) +
          '" lat="' +
          layer.getLatLng().lat +
          '" lng="' +
          layer.getLatLng().lng +
          '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/shub.png"></td><td class="feature-name">' +
          layer.feature.properties.NAME +
          '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
      );
      shubertSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADR,
        source: "shubert",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0],
      });
    }
  },
});
$.getJSON("data/shubert.geojson", function (data) {
  shubert.addData(data);
  map.addLayer(shubertLayer);
});

var pointsLayer = L.geoJson(null);
var points = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/points.png",
        iconSize: [28, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25],
      }),
      title: feature.properties.NAME,
      riseOnHover: true,
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
      "<table class='table table-striped table-bordered table-condensed'>" +
      "<tr><th>Название</th><td>" +
      feature.properties.NAME +
      "</td></tr>" +
      "<tr><th>Адрес</th><td>" +
      feature.properties.AD +
      "</td></tr>" +
      "<tr><th>Об экскурсии</th><td>" +
      feature.properties.OBSH +
      "</td></tr>" +
      "<tr><th>Краткая информация</th><td><audio src=" +
      feature.properties.AUDIO +
      "></audio></td></tr>" +
      "<tr><th>Время работы</th><td>" +
      feature.properties.OPIS +
      "</td></tr>" +
      "<tr><th>Фото</th><td><img width=100% src=" +
      feature.properties.FOTO +
      "></img></td></tr>" +
      "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight
            .clearLayers()
            .addLayer(
              L.circleMarker(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                highlightStyle
              )
            );
        },
      });
      $("#feature-list tbody").append(
        '<tr class="feature-row" id="' +
          L.stamp(layer) +
          '" lat="' +
          layer.getLatLng().lat +
          '" lng="' +
          layer.getLatLng().lng +
          '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/points.png"></td><td class="feature-name">' +
          layer.feature.properties.NAME +
          '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
      );
      pointsSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.AD,
        source: "points",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0],
      });
    }
  },
});
$.getJSON("data/exc_points.geojson", function (data) {
  points.addData(data);
  map.addLayer(pointsLayer);
});

var tennerLayer = L.geoJson(null);
var tenner = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/tenn.png",
        iconSize: [28, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25],
      }),
      title: feature.properties.NAME,
      riseOnHover: true,
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
      "<table class='table table-striped table-bordered table-condensed'>" +
      "<tr><th>Название</th><td>" +
      feature.properties.NAME +
      "</td></tr>" +
      "<tr><th>Адрес</th><td>" +
      feature.properties.DDRSS +
      "</td></tr>" +
      "<tr><th>Описание пункта</th><td>" +
      feature.properties.PUN +
      "</td></tr>" +
      "<tr><th>Фото</th><td><img width=100% src=" +
      feature.properties.P +
      "></img></td></tr>" +
      "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight
            .clearLayers()
            .addLayer(
              L.circleMarker(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                highlightStyle
              )
            );
        },
      });
      $("#feature-list tbody").append(
        '<tr class="feature-row" id="' +
          L.stamp(layer) +
          '" lat="' +
          layer.getLatLng().lat +
          '" lng="' +
          layer.getLatLng().lng +
          '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/tenn.png"></td><td class="feature-name">' +
          layer.feature.properties.NAME +
          '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
      );
      tennerSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.DDRSS,
        source: "tenner",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0],
      });
    }
  },
});
$.getJSON("data/tenner.geojson", function (data) {
  tenner.addData(data);
  map.addLayer(tennerLayer);
});

var aviaLayer = L.geoJson(null);
var avia = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/avia.png",
        iconSize: [28, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25],
      }),
      title: feature.properties.NM,
      riseOnHover: true,
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
        "<table class='table table-striped table-bordered table-condensed'>" +
        "<tr><th>Название</th><td>" +
        feature.properties.NM +
        "</td></tr>" +
        "<tr><th>Адрес</th><td>" +
        feature.properties.ADRS +
        "</td></tr>" +
        "<tr><th>Описание пункта</th><td>" +
        feature.properties.PUNKT +
        "</td></tr>" +
        "<tr><th>Фото</th><td><img width=100% src=" +
        feature.properties.PCTR +
        "></img></td></tr>" +
        "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NM);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight
            .clearLayers()
            .addLayer(
              L.circleMarker(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                highlightStyle
              )
            );
        },
      });
      $("#feature-list tbody").append(
        '<tr class="feature-row" id="' +
          L.stamp(layer) +
          '" lat="' +
          layer.getLatLng().lat +
          '" lng="' +
          layer.getLatLng().lng +
          '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/avia.png"></td><td class="feature-name">' +
          layer.feature.properties.NM +
          '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
      );
      aviaSearch.push({
        name: layer.feature.properties.NM,
        address: layer.feature.properties.ADRS,
        source: "avia",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0],
      });
    }
  },
});
$.getJSON("data/aviahim.geojson", function (data) {
  avia.addData(data);
  map.addLayer(aviaLayer);
});



var museumLayer = L.geoJson(null);
var museum = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/mus.png",
        iconSize: [28, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25],
      }),
      title: feature.properties.NAME,
      riseOnHover: true,
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
        "<table class='table table-striped table-bordered table-condensed'>" +
        "<tr><th>Название</th><td>" +
        feature.properties.NAME +
        "</td></tr>" +
        "<tr><th>Телефон</th><td>" +
        feature.properties.TEL +
        "</td></tr>" +
        "<tr><th>Адрес</th><td>" +
        feature.properties.ADDRESS1 +
        "</td></tr>" +
        "<tr><th>Сайт</th><td><a class='url-break' href='" +
        feature.properties.URL +
        "' target='_blank'>" +
        feature.properties.URL +
        "</a></td></tr>" +
        "<tr><th>Фото</th><td><img width=100% src=" +
        feature.properties.PHOTO +
        "></img></td></tr>" +
        "<tr><th>Описание</th><td>" +
        feature.properties.OPIS +
        "</td></tr>" +
        "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight
            .clearLayers()
            .addLayer(
              L.circleMarker(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                highlightStyle
              )
            );
        },
      });
      $("#feature-list tbody").append(
        '<tr class="feature-row" id="' +
          L.stamp(layer) +
          '" lat="' +
          layer.getLatLng().lat +
          '" lng="' +
          layer.getLatLng().lng +
          '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/mus.png"></td><td class="feature-name">' +
          layer.feature.properties.NAME +
          '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
      );
      museumSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADDRESS1,
        source: "museum",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0],
      });
    }
  },
});
$.getJSON("data/museum.geojson", function (data) {
  museum.addData(data);
  map.addLayer(museumLayer);
});

var eduLayer = L.geoJson(null);
var edus = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/edu.png",
        iconSize: [28, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25],
      }),
      title: feature.properties.NAME,
      riseOnHover: true,
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
        "<table class='table table-striped table-bordered table-condensed'>" +
        "<tr><th>Название</th><td>" +
        feature.properties.NAME +
        "</td></tr>" +
        "<tr><th>Телефон</th><td>" +
        feature.properties.TEL +
        "</td></tr>" +
        "<tr><th>Адрес</th><td>" +
        feature.properties.ADDRESS1 +
        "</td></tr>" +
        "<tr><th>Сайт</th><td><a class='url-break' href='" +
        feature.properties.URL +
        "' target='_blank'>" +
        feature.properties.URL +
        "</a></td></tr>" +
        "<tr><th>Фотография</th><td><img width=100% src=" +
        feature.properties.PHOTO +
        "></img></td></tr>" +
        "<tr><th>Описание</th><td>" +
        feature.properties.OPIS +
        "</td></tr>" +
        "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight
            .clearLayers()
            .addLayer(
              L.circleMarker(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                highlightStyle
              )
            );
        },
      });
      $("#feature-list tbody").append(
        '<tr class="feature-row" id="' +
          L.stamp(layer) +
          '" lat="' +
          layer.getLatLng().lat +
          '" lng="' +
          layer.getLatLng().lng +
          '"><td style="vertical-align: middle;"><img width="24" height="24" src="assets/img/edu.png"></td><td class="feature-name">' +
          layer.feature.properties.NAME +
          '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
      );
      eduSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADDRESS1,
        source: "edu",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0],
      });
    }
  },
});
$.getJSON("data/edu.geojson", function (data) {
  edus.addData(data);
  map.addLayer(eduLayer);
});

var libsLayer = L.geoJson(null);
var libs = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/lib.png",
        iconSize: [28, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25],
      }),
      title: feature.properties.NAME,
      riseOnHover: true,
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
        "<table class='table table-striped table-bordered table-condensed'>" +
        "<tr><th>Название</th><td>" +
        feature.properties.NAME +
        "</td></tr>" +
        "<tr><th>Телефон</th><td>" +
        feature.properties.TEL +
        "</td></tr>" +
        "<tr><th>Адрес</th><td>" +
        feature.properties.ADDRESS1 +
        "</td></tr>" +
        "<tr><th>Сайт</th><td><a class='url-break' href='" +
        feature.properties.URL +
        "' target='_blank'>" +
        feature.properties.URL +
        "</a></td></tr>" +
        "<tr><th>Фотография</th><td><img width=100% src=" +
        feature.properties.PHOTO +
        "></img></td></tr>" +
        "<tr><th>Описание</th><td>" +
        feature.properties.OPIS +
        "</td></tr>" +
        "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight
            .clearLayers()
            .addLayer(
              L.circleMarker(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                highlightStyle
              )
            );
        },
      });
      $("#feature-list tbody").append(
        '<tr class="feature-row" id="' +
          L.stamp(layer) +
          '" lat="' +
          layer.getLatLng().lat +
          '" lng="' +
          layer.getLatLng().lng +
          '"><td style="vertical-align: middle;"><img width="24" height="24" src="assets/img/lib.png"></td><td class="feature-name">' +
          layer.feature.properties.NAME +
          '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
      );
      libsSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADDRESS1,
        source: "libs",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0],
      });
    }
  },
});
$.getJSON("data/libs.geojson", function (data) {
  libs.addData(data);
  map.addLayer(libsLayer);
});

var profLayer = L.geoJson(null);
var profs = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/niv.png",
        iconSize: [28, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25],
      }),
      title: feature.properties.NAME,
      riseOnHover: true,
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
        "<table class='table table-striped table-bordered table-condensed'>" +
        "<tr><th>Название</th><td>" +
        feature.properties.NAME +
        "</td></tr>" +
        "<tr><th>Телефон</th><td>" +
        feature.properties.TEL +
        "</td></tr>" +
        "<tr><th>Адрес</th><td>" +
        feature.properties.ADDRESS1 +
        "</td></tr>" +
        "<tr><th>Сайт</th><td><a class='url-break' href='" +
        feature.properties.URL +
        "' target='_blank'>" +
        feature.properties.URL +
        "</a></td></tr>" +
        "<tr><th>Фотография</th><td><img width=100% src=" +
        feature.properties.PHOTO +
        "></img></td></tr>" +
        "<tr><th>Описание</th><td>" +
        feature.properties.OPIS +
        "</td></tr>" +
        "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight
            .clearLayers()
            .addLayer(
              L.circleMarker(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                highlightStyle
              )
            );
        },
      });
      $("#feature-list tbody").append(
        '<tr class="feature-row" id="' +
          L.stamp(layer) +
          '" lat="' +
          layer.getLatLng().lat +
          '" lng="' +
          layer.getLatLng().lng +
          '"><td style="vertical-align: middle;"><img width="24" height="24" src="assets/img/niv.png"></td><td class="feature-name">' +
          layer.feature.properties.NAME +
          '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
      );
      profSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADDRESS1,
        source: "prof",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0],
      });
    }
  },
});
$.getJSON("data/prof.geojson", function (data) {
  profs.addData(data);
  map.addLayer(profLayer);
});

var vlastLayer = L.geoJson(null);
var vlast = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/vlast.png",
        iconSize: [28, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25],
      }),
      title: feature.properties.NAME,
      riseOnHover: true,
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
        "<table class='table table-striped table-bordered table-condensed'>" +
        "<tr><th>Название</th><td>" +
        feature.properties.NAME +
        "</td></tr>" +
        "<tr><th>Телефон</th><td>" +
        feature.properties.TEL +
        "</td></tr>" +
        "<tr><th>Адрес</th><td>" +
        feature.properties.ADDRESS1 +
        "</td></tr>" +
        "<tr><th>Сайт</th><td><a class='url-break' href='" +
        feature.properties.URL +
        "' target='_blank'>" +
        feature.properties.URL +
        "</a></td></tr>" +
        "<tr><th>Фотография</th><td><img width=100% src=" +
        feature.properties.PHOTO +
        "></img></td></tr>" +
        "<tr><th>Описание</th><td>" +
        feature.properties.OPIS +
        "</td></tr>" +
        "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight
            .clearLayers()
            .addLayer(
              L.circleMarker(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                highlightStyle
              )
            );
        },
      });
      $("#feature-list tbody").append(
        '<tr class="feature-row" id="' +
          L.stamp(layer) +
          '" lat="' +
          layer.getLatLng().lat +
          '" lng="' +
          layer.getLatLng().lng +
          '"><td style="vertical-align: middle;"><img width="24" height="24" src="assets/img/vlast.png"></td><td class="feature-name">' +
          layer.feature.properties.NAME +
          '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
      );
      vlastSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADDRESS1,
        source: "vlast",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0],
      });
    }
  },
});
$.getJSON("data/vlast.geojson", function (data) {
  vlast.addData(data);
  map.addLayer(vlastLayer);
});

var markLayer = L.geoJson(null);
var marks = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/savic.png",
        iconSize: [28, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25],
      }),
      title: feature.properties.NAME,
      riseOnHover: true,
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
        "<table class='table table-striped table-bordered table-condensed'>" +
        "<tr><th>Название</th><td>" +
        feature.properties.NAME +
        "</td></tr>" +
        "<tr><th>Адрес</th><td>" +
        feature.properties.ADRESS1 +
        "</td></tr>" +
        "<tr><th>Фотография</th><td><img width=100% src=" +
        feature.properties.PHOTO +
        "></img></td></tr>" +
        "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight
            .clearLayers()
            .addLayer(
              L.circleMarker(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                highlightStyle
              )
            );
        },
      });
      $("#feature-list tbody").append(
        '<tr class="feature-row" id="' +
          L.stamp(layer) +
          '" lat="' +
          layer.getLatLng().lat +
          '" lng="' +
          layer.getLatLng().lng +
          '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/savic.png"></td><td class="feature-name">' +
          layer.feature.properties.NAME +
          '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
      );
      markSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADRESS1,
        source: "marks",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0],
      });
    }
  },
});
$.getJSON("data/mark_sav.geojson", function (data) {
  marks.addData(data);
  map.addLayer(markLayer);
});

var markLayer2 = L.geoJson(null);
var marks2 = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/nasec.png",
        iconSize: [28, 14],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25],
      }),
      title: feature.properties.NAME,
      riseOnHover: true,
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
        "<table class='table table-striped table-bordered table-condensed'>" +
        "<tr><th>Название</th><td>" +
        feature.properties.NAME +
        "</td></tr>" +
        "<tr><th>Адрес</th><td>" +
        feature.properties.ADRESS1 +
        "</td></tr>" +
        "<tr><th>Фотография</th><td><img width=100% src=" +
        feature.properties.PHOTO +
        "></img></td></tr>" +
        "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight
            .clearLayers()
            .addLayer(
              L.circleMarker(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                highlightStyle
              )
            );
        },
      });
      $("#feature-list tbody").append(
        '<tr class="feature-row" id="' +
          L.stamp(layer) +
          '" lat="' +
          layer.getLatLng().lat +
          '" lng="' +
          layer.getLatLng().lng +
          '"><td style="vertical-align: middle;"><img width="18" height="9" src="assets/img/nasec.png"></td><td class="feature-name">' +
          layer.feature.properties.NAME +
          '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
      );
      markSearch2.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADRESS1,
        source: "marks2",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0],
      });
    }
  },
});
$.getJSON("data/mark_sav2.geojson", function (data) {
  marks2.addData(data);  
  map.addLayer(markLayer2);
});

var markLayer3 = L.geoJson(null);
var marks3 = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/vitr.png",
        iconSize: [28, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25],
      }),
      title: feature.properties.NAME,
      riseOnHover: true,
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
        "<table class='table table-striped table-bordered table-condensed'>" +
        "<tr><th>Название</th><td>" +
        feature.properties.NAME +
        "</td></tr>" +
        "<tr><th>Описание</th><td>" +
        feature.properties.OPIS +
        "</td></tr>" +
        "<tr><th>Изображение</th><td><img width=100% src=" +
        feature.properties.PHOTO +
        "></img></td></tr>" +
        "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight
            .clearLayers()
            .addLayer(
              L.circleMarker(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                highlightStyle
              )
            );
        },
      });
      $("#feature-list tbody").append(
        '<tr class="feature-row" id="' +
          L.stamp(layer) +
          '" lat="' +
          layer.getLatLng().lat +
          '" lng="' +
          layer.getLatLng().lng +
          '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/vitr.png"></td><td class="feature-name">' +
          layer.feature.properties.NAME +
          '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
      );
      markSearch3.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADRESS1,
        source: "marks3",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0],
      });
    }
  },
});
$.getJSON("data/mark_vit.geojson", function (data) {
  marks3.addData(data);
  map.addLayer(markLayer3);
});

var markLayer4 = L.geoJson(null);
var marks4 = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/bayer.png",
        iconSize: [28, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25],
      }),
      title: feature.properties.NAME,
      riseOnHover: true,
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
        "<table class='table table-striped table-bordered table-condensed'>" +
        "<tr><th>Название</th><td>" +
        feature.properties.NAME +
        "</td></tr>" +
        "<tr><th>Адрес</th><td>" +
        feature.properties.ADRESS +
        "</td></tr>" +
        "<tr><th>Описание</th><td>" +
        feature.properties.OPIS +
        "</td></tr>" +
        "<tr><th>Изображение</th><td><img width=100% src=" +
        feature.properties.PHOTO +
        "></img></td></tr>" +
        "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight
            .clearLayers()
            .addLayer(
              L.circleMarker(
                [
                  feature.geometry.coordinates[0],
                  feature.geometry.coordinates[1],
                ],
                highlightStyle
              )
            );
        },
      });
      $("#feature-list tbody").append(
        '<tr class="feature-row" id="' +
          L.stamp(layer) +
          '" lat="' +
          layer.getLatLng().lat +
          '" lng="' +
          layer.getLatLng().lng +
          '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/bayer.png"></td><td class="feature-name">' +
          layer.feature.properties.NAME +
          '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
      );
      markSearch4.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADRESS1,
        source: "marks4",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0],
      });
    }
  },
});
$.getJSON("data/navod.geojson", function (data) {
  marks4.addData(data);
  map.addLayer(markLayer4);
});

var vekLayer = L.geoJson(null);
var veks = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/vek.png",
        iconSize: [28, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25],
      }),
      title: feature.properties.NAME,
      riseOnHover: true,
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
        "<table class='table table-striped table-bordered table-condensed'>" +
        "<tr><th>Название</th><td>" +
        feature.properties.NAME +
        "</td></tr>" +
        "<tr><th>Адрес</th><td>" +
        feature.properties.ADDRESS1 +
        "</td></tr>" +   
        "<tr><th>Описание</th><td>" +
        feature.properties.OPIS +
        "</td></tr>" +     
        "<tr><th>Фото</th><td><img width=100% src=" +
        feature.properties.PHOTO +
        "></img></td></tr>" +
        "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight
            .clearLayers()
            .addLayer(
              L.circleMarker(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                highlightStyle
              )
            );
        },
      });
      $("#feature-list tbody").append(
        '<tr class="feature-row" id="' +
          L.stamp(layer) +
          '" lat="' +
          layer.getLatLng().lat +
          '" lng="' +
          layer.getLatLng().lng +
          '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/vekov.png"></td><td class="feature-name">' +
          layer.feature.properties.NAME +
          '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
      );
      vekSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADDRESS1,
        source: "veks",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0],
      });
    }
  },
});
$.getJSON("data/vek.geojson", function (data) {
  veks.addData(data);
  map.addLayer(vekLayer);
});

var visLayer = L.geoJson(null);
var viso = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/dom.png",
        iconSize: [28, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25],
      }),
      title: feature.properties.NAME,
      riseOnHover: true,
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
        "<table class='table table-striped table-bordered table-condensed'>" +
        "<tr><th>Название</th><td>" +
        feature.properties.NAME +
        "</td></tr>" +
        "<tr><th>Контакты</th><td>" +
        feature.properties.NUM +
        "</td></tr>" +
        "<tr><th>Адрес</th><td>" +
        feature.properties.ADD +
        "</td></tr>" +
        "<tr><th>Сайт</th><td><a class='url-break' href='" +
        feature.properties.URL +
        "' target='_blank'>" +
        feature.properties.URL +
        "</a></td></tr>" +
        "<tr><th>Описание</th><td>" +
        feature.properties.DESC +
        "</td></tr>" +
        "<tr><th>Фото</th><td><img width=100% src=" +
        feature.properties.PIC +
        "></img></td></tr>" +
        "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight
            .clearLayers()
            .addLayer(
              L.circleMarker(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                highlightStyle
              )
            );
        },
      });
      $("#feature-list tbody").append(
        '<tr class="feature-row" id="' +
          L.stamp(layer) +
          '" lat="' +
          layer.getLatLng().lat +
          '" lng="' +
          layer.getLatLng().lng +
          '"><td style="vertical-align: middle;"><img width="24" height="24" src="assets/img/dom.png"></td><td class="feature-name">' +
          layer.feature.properties.NAME +
          '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
      );
      visSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADD,
        source: "viso",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0],
      });
    }
  },
});
$.getJSON("data/vis_ob.geojson", function (data) {
  viso.addData(data);
  map.addLayer(visLayer);
});

var geincLayer = L.geoJson(null);
var geinc = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/gein.png",
        iconSize: [28, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25],
      }),
      title: feature.properties.NAME,
      riseOnHover: true,
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content =
        "<table class='table table-striped table-bordered table-condensed'>" +
        "<tr><th>Название</th><td>" +
        feature.properties.NAME +
        "</td></tr>" +
        "<tr><th>Адрес</th><td>" +
        feature.properties.AD +
        "</td></tr>" +
        "<tr><th>Фото</th><td><img width=100% src=" +
        feature.properties.PICT +
        "></img></td></tr>" +
        "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight
            .clearLayers()
            .addLayer(
              L.circleMarker(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                highlightStyle
              )
            );
        },
      });
      $("#feature-list tbody").append(
        '<tr class="feature-row" id="' +
          L.stamp(layer) +
          '" lat="' +
          layer.getLatLng().lat +
          '" lng="' +
          layer.getLatLng().lng +
          '"><td style="vertical-align: middle;"><img width="18" height="18" src="assets/img/gein.png"></td><td class="feature-name">' +
          layer.feature.properties.NAME +
          '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>'
      );
      geincSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.AD,
        source: "geinc",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0],
      });
    }
  },
});
$.getJSON("data/geinc.geojson", function (data) {
  geinc.addData(data);
  map.addLayer(geincLayer);
});

// Планы Санкт-Петербурга
// 1777 год
var img_1777 = "/plans/1777.png";
var img_bounds_1777 = [
  [59.8860151581, 30.1805009418],
  [60.0081248993, 30.4543333429],
];
var overlay_1777 = new L.imageOverlay(img_1777, img_bounds_1777);
// 1860 год
var img_1860 = "/plans/1860.png";
var img_bounds_1860 = [
  [59.8733474059, 30.1846401439],
  [60.0068834869, 30.4435055004],
];
var overlay_1860 = new L.imageOverlay(img_1860, img_bounds_1860);

// 1824 год
var img_1824 = "/plans/1824.png";
var img_bounds_1824 = [
  [59.9997209527, 30.190000776],
  [59.8831457388, 30.4190586852],
];
var overlay_1824 = new L.imageOverlay(img_1824, img_bounds_1824);

// 1924 год
var img_1924 = "/plans/map_1924.png";
var img_bounds_1924 = [
  [60.0023689521, 30.1823476169],
  [59.8464325053, 30.4350616079],
];
var overlay_1924 = new L.imageOverlay(img_1924, img_bounds_1924);

map = L.map("map", {
  zoom: 10,
  center: [87.19909,53.74275],
  layers: [cartoLight, boroughs, sLines, streets, exc, zone15, zone10, zone5, markerClusters, highlight],
  zoomControl: false,
  attributionControl: false,
});

map.on("overlayadd", function (e) {
  if (e.layer === objectLayer) {
    markerClusters.addLayer(objects);
    syncSidebar();
  }
  if (e.layer === pointsLayer) {
    markerClusters.addLayer(points);
    syncSidebar();
  }
  if (e.layer === museumLayer) {
    markerClusters.addLayer(museum);
    syncSidebar();
  }
  if (e.layer === tennerLayer) {
    markerClusters.addLayer(tenner);
    syncSidebar();
  }
  if (e.layer === shubertLayer) {
    markerClusters.addLayer(shubert);
    syncSidebar();
  }
  if (e.layer === aviaLayer) {
    markerClusters.addLayer(avia);
    syncSidebar();
  }
  if (e.layer === eduLayer) {
    markerClusters.addLayer(edus);
    syncSidebar();
  }
  if (e.layer === libsLayer) {
    markerClusters.addLayer(libs);
    syncSidebar();
  }
  if (e.layer === profLayer) {
    markerClusters.addLayer(profs);
    syncSidebar();
  }
  if (e.layer === vlastLayer) {
    markerClusters.addLayer(vlast);
    syncSidebar();
  }
  if (e.layer === markLayer) {
    markerClusters.addLayer(marks);
    syncSidebar();
  }
  if (e.layer === markLayer2) {
    markerClusters.addLayer(marks2);
    syncSidebar();
  }
  if (e.layer === markLayer3) {
    markerClusters.addLayer(marks3);
    syncSidebar();
  }
  if (e.layer === markLayer4) {
    markerClusters.addLayer(marks4);
    syncSidebar();
  }
  if (e.layer === vekLayer) {
    markerClusters.addLayer(veks);
    syncSidebar();
  }
  if (e.layer === visLayer) {
    markerClusters.addLayer(viso);
    syncSidebar();
  }
  if (e.layer === geincLayer) {
    markerClusters.addLayer(geinc);
    syncSidebar();
  }
});

map.on("overlayremove", function (e) {
  if (e.layer === objectLayer) {
    markerClusters.removeLayer(objects);
    syncSidebar();
  }
  if (e.layer === pointsLayer) {
    markerClusters.removeLayer(points);
    syncSidebar();
  }
  if (e.layer === tennerLayer) {
    markerClusters.removeLayer(tenner);
    syncSidebar();
  }
  if (e.layer === shubertLayer) {
    markerClusters.removeLayer(shubert);
    syncSidebar();
  }
  if (e.layer === aviaLayer) {
    markerClusters.removeLayer(avia);
    syncSidebar();
  }
  if (e.layer === museumLayer) {
    markerClusters.removeLayer(museum);
    syncSidebar();
  }
  if (e.layer === eduLayer) {
    markerClusters.removeLayer(edus);
    syncSidebar();
  }
  if (e.layer === libsLayer) {
    markerClusters.removeLayer(libs);
    syncSidebar();
  }
  if (e.layer === profLayer) {
    markerClusters.removeLayer(profs);
    syncSidebar();
  }
  if (e.layer === vlastLayer) {
    markerClusters.removeLayer(vlast);
    syncSidebar();
  }
  if (e.layer === markLayer) {
    markerClusters.removeLayer(marks);
    syncSidebar();
  }
  if (e.layer === markLayer2) {
    markerClusters.removeLayer(marks2);
    syncSidebar();
  }
  if (e.layer === markLayer3) {
    markerClusters.removeLayer(marks3);
    syncSidebar();
  }
  if (e.layer === markLayer4) {
    markerClusters.removeLayer(marks4);
    syncSidebar();
  }
  if (e.layer === vekLayer) {
    markerClusters.removeLayer(veks);
    syncSidebar();
  }
  if (e.layer === visLayer) {
    markerClusters.removeLayer(viso);
    syncSidebar();
  }
  if (e.layer === geincLayer) {
    markerClusters.removeLayer(geinc);
    syncSidebar();
  }
});

/* Фильтр списка объектов боковой панели для отображения объектов только в текущих границах карты */
map.on("moveend", function (e) {
  syncSidebar();
});

/* Очистить выделение объектов при нажатии на карту */
map.on("click", function (e) {
  highlight.clearLayers();
});

function updateAttribution(e) {
  $.each(map._layers, function (index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html(layer.getAttribution());
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright",
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML =
    "<span class='-xs'><a href='https://www.admnkz.info/'>Город Новокузнецк</a></span>";
  return div;
};
map.addControl(attributionControl);

var zoomControl = L.control
  .zoom({
    position: "bottomleft",
  })
  .addTo(map);

/* Геолокация для отслеживания местоположения пользователя при нажатии */
var locateControl = L.control
  .locate({
    position: "bottomleft",
    drawCircle: true,
    follow: true,
    setView: true,
    keepCurrentZoomLevel: true,
    markerStyle: {
      weight: 1,
      opacity: 0.8,
      fillOpacity: 0.8,
    },
    circleStyle: {
      weight: 1,
      clickable: false,
    },
    icon: "fa fa-location-arrow",
    metric: false,
    strings: {
      title: "Моё местоположение",
      popup: "Вы в {distance} {unit} от точки",
      outsidemapBoundsMsg: "Вы, кажется, находитесь за пределами границ карты",
    },
    locateOptions: {
      maxZoom: 18,
      watch: true,
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 10000,
    },
  })
  .addTo(map);


/* Большие экраны получают расширенное управление слоями и видимую боковую панель */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Карта (CartoDB)": cartoLight,
  "Карта (OSM)": osmm,
  "Карта (2GIS)": m2gis,
  "Карта (ЕЭКО)": esritp,
  "Карта (ESRI)": esri,
  "Карта (mapbox)": mbstrt,
  "Спутник (ESRI)": arconline,
  "Спутник (mapbox)": mbx,
};


var groupedOverlays = {

  "Административно-территориальное устройство": {
    "<img src='assets/img/globe.png' width='28' height='4'>&nbsp;Граница города": boroughs,
    "<img src='assets/img/curve.png' width='28' height='4'>&nbsp;Районы города": sLines,
    "<img src='assets/img/road.png' width='28' height='4'>&nbsp;Главные улицы города": streets,
  },
  
  "Экстренные оперативные службы": {
    "<img src='assets/img/mus.png' width='40' height='40'>&nbsp;Пожарные части": museumLayer,
    "<img src='assets/img/edu.png' width='40' height='40'>&nbsp;Скорая медицинская помощь": eduLayer,
    "<img src='assets/img/lib.png' width='40' height='40'>&nbsp;Отделения полиции": libsLayer,
    "<img src='assets/img/vlast.png' width=40' height='40'>&nbsp;Аварийная газовая служба": vlastLayer,
  },
  
  "Административное управление": {
    "<img src='assets/img/lah.png' width='40' height='60'>&nbsp;Администрация города и районов": objectLayer,
    "<img src='assets/img/niv.png' width='40' height='40'>&nbsp;Защита населания и территории": profLayer,
  },
  "Дополнительные": {
    "<img src='assets/img/tenn.png' width='40' height='40'>&nbsp;Участковые пункты полиции": tennerLayer,
    "<img src='assets/img/shub.png' width='40' height='40'>&nbsp;Поликлиники и больницы": shubertLayer,
  },
  "Эвакуационные пункты": {
    "<img src='assets/img/points.png' width='40' height='40'>&nbsp;Эвакуационные пункты": pointsLayer,
  },
  "Зоны пешеходной доступности</br>от домов до эвакуационых пунктов": {
    "<img src='assets/img/5m.png' width='40' height='30'>&nbsp;3 минут": zone5,
    "<img src='assets/img/10m.png' width='40' height='30'>&nbsp;6 минут": zone10
  },
};

var groupedOverlays2 = {
  " ": {
    " ":
    overlay_1777,
    " ":
    overlay_1824,
    " ":
    overlay_1860,
    " ":
    overlay_1924,
  },
  "Транспортная доступность экстреных служб</br> до 4 минут, до 7 минут,до 10 минут": {
    "<img src='assets/img/1824n.png' width=120' height='90'>&nbsp;Скорая медицинская помощь": nav1824,
    "<img src='assets/img/1924n.png' width='120' height='90'>&nbsp;Полиция": nav1924,
    "<img src='assets/img/1925n.png' width='120' height='90'>&nbsp;Пожарная служба": nav1925
  },

};
var layerControl = L.control
  .groupedLayers(baseLayers, groupedOverlays, groupedOverlays2, {
    collapsed: isCollapsed,
  })
  .addTo(map);

L.control.scale().addTo(map);

/* Выделение текста поля поиска по щелчку мыши */
$("#searchbox").click(function () {
  $(this).select();
});

$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});

$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});

/* Функция поиска по заголовкам */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
/* Подгонка карты к границам */
  map.fitBounds(boroughs.getBounds());
  featureList = new List("features", { valueNames: ["feature-name"] });
  featureList.sort("feature-name", { order: "asc" });

  var boroughsBH = new Bloodhound({
    name: "Boroughs",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: boroughSearch,
    limit: 10,
  });

  var objectsBH = new Bloodhound({
    name: "objects",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: objectSearch,
    limit: 10,
  });

  var pointsBH = new Bloodhound({
    name: "points",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: pointsSearch,
    limit: 10,
  });

  var shubertBH = new Bloodhound({
    name: "shubert",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: shubertSearch,
    limit: 10,
  });

  var tennerBH = new Bloodhound({
    name: "tenner",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: tennerSearch,
    limit: 10,
  });

  var aviaBH = new Bloodhound({
    name: "avia",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: aviaSearch,
    limit: 10,
  });

  var museumBH = new Bloodhound({
    name: "museum",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: museumSearch,
    limit: 10,
  });

  var edusBH = new Bloodhound({
    name: "edus",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: eduSearch,
    limit: 10,
  });

  var libsBH = new Bloodhound({
    name: "libs",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: libsSearch,
    limit: 10,
  });

  var profsBH = new Bloodhound({
    name: "profs",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: profSearch,
    limit: 10,
  });

  var vlastBH = new Bloodhound({
    name: "vlast",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: vlastSearch,
    limit: 10,
  });

  var marksBH = new Bloodhound({
    name: "marks",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: markSearch,
    limit: 10,
  });

  var marksBH2 = new Bloodhound({
    name: "marks2",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: markSearch2,
    limit: 10,
  });

  var marksBH3 = new Bloodhound({
    name: "marks3",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: markSearch3,
    limit: 10,
  });

  var marksBH4 = new Bloodhound({
    name: "marks4",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: markSearch4,
    limit: 10,
  });
    
  var veksBH = new Bloodhound({
    name: "veks",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: vekSearch,
    limit: 10,
  });

  var visoBH = new Bloodhound({
    name: "viso",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: visSearch,
    limit: 10,
  });

  var nav1824BH = new Bloodhound({
    name: "nav1824",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: nav1824Search,
    limit: 10,
  });

  var nav1924BH = new Bloodhound({
    name: "nav1924",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: nav1924Search,
    limit: 10,
  });
    var nav1925BH = new Bloodhound({
    name: "nav1925",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: nav1925Search,
    limit: 10,
  });
  var zone15BH = new Bloodhound({
    name: "zone15",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: zone15Search,
    limit: 10,
  });

  var zone10BH = new Bloodhound({
    name: "zone10",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: zone10Search,
    limit: 10,
  });

  var zone5BH = new Bloodhound({
    name: "zone5",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: zone5Search,
    limit: 10,
  });

  var geincBH = new Bloodhound({
    name: "geinc",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: geincSearch,
    limit: 10,
  });

  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames",
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url +=
            "&east=" +
            map.getBounds().getEast() +
            "&west=" +
            map.getBounds().getWest() +
            "&north=" +
            map.getBounds().getNorth() +
            "&south=" +
            map.getBounds().getSouth();
          $("#searchicon")
            .removeClass("fa-search")
            .addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $("#searchicon")
            .removeClass("fa-refresh fa-spin")
            .addClass("fa-search");
        },
      },
    },
    limit: 10,
  });
  boroughsBH.initialize();
  objectsBH.initialize();
  shubertBH.initialize();
  tennerBH.initialize();
  pointsBH.initialize();
  aviaBH.initialize();
  museumBH.initialize();
  edusBH.initialize();
  libsBH.initialize();
  profsBH.initialize();
  vlastBH.initialize();
  marksBH.initialize();
  marksBH2.initialize();
  marksBH3.initialize();
  marksBH4.initialize();
  veksBH.initialize();
  geonamesBH.initialize();
  visoBH.initialize();
  nav1824BH.initialize();
  nav1924BH.initialize();
  zone15BH.initialize();
  zone10BH.initialize();
  zone5BH.initialize();
  geincBH.initialize();

/* создание экземпляра пользовательского интерфейса typeahead */
  $("#searchbox")
    .typeahead(
      {
        minLength: 3,
        highlight: true,
        hint: false,
      },
      {
        name: "Boroughs",
        displayKey: "name",
        source: boroughsBH.ttAdapter(),
        templates: {
          header: "<h4 class='typeahead-header'>Районы</h4>",
        },
      },
      {
        name: "objects",
        displayKey: "name",
        source: objectsBH.ttAdapter(),
        templates: {
          header:
            "<h4 class='typeahead-header'><img src='assets/img/lah.png' width='40' height='60'>&nbsp;Значимые объекты</h4>",
          suggestion: Handlebars.compile(
            ["{{name}}<br>&nbsp;<small>{{address}}</small>"].join("")
          ),
        },
      },
      {
        name: "avia",
        displayKey: "name",
        source: aviaBH.ttAdapter(),
        templates: {
          header:
            "<h4 class='typeahead-header'><img src='assets/img/avia.png' width='28' height='28'>&nbsp;Триангуляция Авиахима</h4>",
          suggestion: Handlebars.compile(
            ["{{name}}<br>&nbsp;<small>{{address}}</small>"].join("")
          ),
        },
      },
      {
        name: "points",
        displayKey: "name",
        source: pointsBH.ttAdapter(),
        templates: {
          header:
            "<h4 class='typeahead-header'><img src='assets/img/points.png' width='28' height='28'>&nbsp;Остановки маршрутов</h4>",
          suggestion: Handlebars.compile(
            ["{{name}}<br>&nbsp;<small>{{address}}</small>"].join("")
          ),
        },
      },
      {
        name: "shubert",
        displayKey: "name",
        source: shubertBH.ttAdapter(),
        templates: {
          header:
            "<h4 class='typeahead-header'><img src='assets/img/shub.png' width='28' height='28'>&nbsp;Триангуляция Шуберта</h4>",
          suggestion: Handlebars.compile(
            ["{{name}}<br>&nbsp;<small>{{address}}</small>"].join("")
          ),
        },
      },
      {
        name: "tenner",
        displayKey: "name",
        source: tennerBH.ttAdapter(),
        templates: {
          header:
            "<h4 class='typeahead-header'><img src='assets/img/tenn.png' width='28' height='28'>&nbsp;Триангуляция Теннера</h4>",
          suggestion: Handlebars.compile(
            ["{{name}}<br>&nbsp;<small>{{address}}</small>"].join("")
          ),
        },
      },
      
      {
        name: "museum",
        displayKey: "name",
        source: museumBH.ttAdapter(),
        templates: {
          header:
            "<h4 class='typeahead-header'><img src='assets/img/mus.png' width='40' height='40'>&nbsp;Музеи</h4>",
          suggestion: Handlebars.compile(
            ["{{name}}<br>&nbsp;<small>{{address}}</small>"].join("")
          ),
        },
      },
      {
        name: "edus",
        displayKey: "name",
        source: edusBH.ttAdapter(),
        templates: {
          header:
            "<h4 class='typeahead-header'><img src='assets/img/edu.png' width='40' height='40'>&nbsp;Учебные заведения</h4>",
          suggestion: Handlebars.compile(
            ["{{name}}<br>&nbsp;<small>{{address}}</small>"].join("")
          ),
        },
      },
      {
        name: "libs",
        displayKey: "name",
        source: libsBH.ttAdapter(),
        templates: {
          header:
            "<h4 class='typeahead-header'><img src='assets/img/lib.png' width='40' height='40'>&nbsp;Библиотеки</h4>",
          suggestion: Handlebars.compile(
            ["{{name}}<br>&nbsp;<small>{{address}}</small>"].join("")
          ),
        },
      },
      {
        name: "profs",
        displayKey: "name",
        source: profsBH.ttAdapter(),
        templates: {
          header:
            "<h4 class='typeahead-header'><img src='assets/img/niv.png' width='40' height='40'>&nbsp;Организации-партнеры</h4>",
          suggestion: Handlebars.compile(
            ["{{name}}<br>&nbsp;<small>{{address}}</small>"].join("")
          ),
        },
      },
      {
        name: "vlast",
        displayKey: "name",
        source: vlastBH.ttAdapter(),
        templates: {
          header:
            "<h4 class='typeahead-header'><img src='assets/img/vlast.png' width='40' height='40'>&nbsp;Органы власти</h4>",
          suggestion: Handlebars.compile(
            ["{{name}}<br>&nbsp;<small>{{address}}</small>"].join("")
          ),
        },
      },
      {
        name: "marks",
        displayKey: "name",
        source: marksBH.ttAdapter(),
        templates: {
          header:
            "<h4 class='typeahead-header'><img src='assets/img/savic.png' width='28' height='28'>&nbsp;Марки Савицкого</h4>",
          suggestion: Handlebars.compile(
            ["{{name}}<br>&nbsp;<small>{{address}}</small>"].join("")
          ),
        },
      },
      {
        name: "marks2",
        displayKey: "name",
        source: marksBH2.ttAdapter(),
        templates: {
          header:
            "<h4 class='typeahead-header'><img src='assets/img/nasec.png' width='24' height='12'>&nbsp;Насечки Савицкого</h4>",
          suggestion: Handlebars.compile(
            ["{{name}}<br>&nbsp;<small>{{address}}</small>"].join("")
          ),
        },
      },
      {
        name: "marks3",
        displayKey: "name",
        source: marksBH3.ttAdapter(),
        templates: {
          header:
            "<h4 class='typeahead-header'><img src='assets/img/vitr.png' width='28' height='28'>&nbsp;Марки Витрама</h4>",
          suggestion: Handlebars.compile(
            ["{{name}}<br>&nbsp;<small>{{address}}</small>"].join("")
          ),
        },
      },
      {
        name: "marks4",
        displayKey: "name",
        source: marksBH4.ttAdapter(),
        templates: {
          header:
            "<h4 class='typeahead-header'><img src='assets/img/bayer.png' width='28' height='28'>&nbsp;Нивелировка Бауэра</h4>",
          suggestion: Handlebars.compile(
            ["{{name}}<br>&nbsp;<small>{{address}}</small>"].join("")
          ),
        },
      },
      {
        name: "veks",
        displayKey: "name",
        source: veksBH.ttAdapter(),
        templates: {
          header:
            "<h4 class='typeahead-header'><img src='assets/img/vek.png' width='28' height='28'>&nbsp;Вековые репера</h4>",
          suggestion: Handlebars.compile(
            ["{{name}}<br>&nbsp;<small>{{address}}</small>"].join("")
          ),
        },
      },
      {
        name: "viso",
        displayKey: "name",
        source: visoBH.ttAdapter(),
        templates: {
          header:
            "<h4 class='typeahead-header'><img src='assets/img/dom.png' width='28' height='28'>&nbsp;Высотные доминанты</h4>",
          suggestion: Handlebars.compile(
            ["{{name}}<br>&nbsp;<small>{{address}}</small>"].join("")
          ),
        },
      },
      {
        name: "geinc",
        displayKey: "name",
        source: geincBH.ttAdapter(),
        templates: {
          header:
            "<h4 class='typeahead-header'><img src='assets/img/gein.png' width='28' height='28'>&nbsp;Нивелировка Гейнца</h4>",
          suggestion: Handlebars.compile(
            ["{{name}}<br>&nbsp;<small>{{address}}</small>"].join("")
          ),
        },
      },
      {
        name: "GeoNames",
        displayKey: "name",
        source: geonamesBH.ttAdapter(),
        templates: {
          header:
            "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;ГеоНазвания</h4>",
        },
      }
    )
    .on("typeahead:selected", function (obj, datum) {
      if (datum.source === "Boroughs") {
        map.fitBounds(datum.bounds);
      }
      if (datum.source === "objects") {
        if (!map.hasLayer(objectLayer)) {
          map.addLayer(objectLayer);
        }
        map.setView([datum.lat, datum.lng], 17);
        if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
        }
      }
      
      if (datum.source === "points") {
        if (!map.hasLayer(pointsLayer)) {
          map.addLayer(pointsLayer);
        }
        map.setView([datum.lat, datum.lng], 17);
        if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
        }
      }
      if (datum.source === "shubert") {
        if (!map.hasLayer(shubertLayer)) {
          map.addLayer(shubertLayer);
        }
        map.setView([datum.lat, datum.lng], 17);
        if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
        }
      }
      if (datum.source === "avia") {
        if (!map.hasLayer(aviaLayer)) {
          map.addLayer(aviaLayer);
        }
        map.setView([datum.lat, datum.lng], 17);
        if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
        }
      }
      if (datum.source === "tenner") {
        if (!map.hasLayer(tennerLayer)) {
          map.addLayer(tennerLayer);
        }
        map.setView([datum.lat, datum.lng], 17);
        if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
        }
      }
      if (datum.source === "museum") {
        if (!map.hasLayer(museumLayer)) {
          map.addLayer(museumLayer);
        }
        map.setView([datum.lat, datum.lng], 17);
        if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
        }
      }
      if (datum.source === "edus") {
        if (!map.hasLayer(eduLayer)) {
          map.addLayer(eduLayer);
        }
        map.setView([datum.lat, datum.lng], 17);
        if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
        }
      }
      if (datum.source === "libs") {
        if (!map.hasLayer(libsLayer)) {
          map.addLayer(libsLayer);
        }
        map.setView([datum.lat, datum.lng], 17);
        if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
        }
      }
      if (datum.source === "profs") {
        if (!map.hasLayer(profLayer)) {
          map.addLayer(profLayer);
        }
        map.setView([datum.lat, datum.lng], 17);
        if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
        }
      }
      if (datum.source === "vlast") {
        if (!map.hasLayer(vlastLayer)) {
          map.addLayer(vlastLayer);
        }
        map.setView([datum.lat, datum.lng], 17);
        if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
        }
      }
      if (datum.source === "marks") {
        if (!map.hasLayer(markLayer)) {
          map.addLayer(markLayer);
        }
        map.setView([datum.lat, datum.lng], 17);
        if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
        }
      }
      if (datum.source === "marks2") {
        if (!map.hasLayer(markLayer2)) {
          map.addLayer(markLayer2);
        }
        map.setView([datum.lat, datum.lng], 17);
        if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
        }
      }
      if (datum.source === "marks3") {
        if (!map.hasLayer(markLayer3)) {
          map.addLayer(markLayer3);
        }
        map.setView([datum.lat, datum.lng], 17);
        if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
        }
      }
      if (datum.source === "marks4") {
        if (!map.hasLayer(markLayer4)) {
          map.addLayer(markLayer4);
        }
        map.setView([datum.lat, datum.lng], 17);
        if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
        }
      }
      if (datum.source === "veks") {
        if (!map.hasLayer(vekLayer)) {
          map.addLayer(vekLayer);
        }
        map.setView([datum.lat, datum.lng], 17);
        if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
        }
      }
      
      if (datum.source === "viso") {
        if (!map.hasLayer(visLayer)) {
          map.addLayer(visLayer);
        }
        map.setView([datum.lat, datum.lng], 17);
        if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
        }
      }
      if (datum.source === "geinc") {
        if (!map.hasLayer(geincLayer)) {
          map.addLayer(geincLayer);
        }
        map.setView([datum.lat, datum.lng], 17);
        if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
        }
      }
      if (datum.source === "GeoNames") {
        map.setView([datum.lat, datum.lng], 14);
      }
      if ($(".navbar-collapse").height() > 50) {
        $(".navbar-collapse").collapse("hide");
      }
    })
    .on("typeahead:opened", function () {
      $(".navbar-collapse.in").css(
        "max-height",
        $(document).height() - $(".navbar-header").height()
      );
      $(".navbar-collapse.in").css(
        "height",
        $(document).height() - $(".navbar-header").height()
      );
    })
    .on("typeahead:closed", function () {
      $(".navbar-collapse.in").css("max-height", "");
      $(".navbar-collapse.in").css("height", "");
    });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

// Leaflet patch для прокрутки элементов управления слоями в сенсорных браузерах
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent.disableClickPropagation(container).disableScrollPropagation(
    container
  );
} else {
  L.DomEvent.disableClickPropagation(container);
}


// Leaflet Routing Machine - плагин для проложения пользовательских маршрутов
var mycontrol = L.Routing.control({
	waypoints: [
		L.latLng(0,0),
		L.latLng(0,0)
	],
  geocoder: L.Control.Geocoder.mapbox('pk.eyJ1Ijoidm9yb2Jpb3Zha3Jpc3RpbmEiLCJhIjoiY2x0NGZjb3AzMDFiYjJpbzNkdGYyMzhyYSJ9.YhxKc5Z5NVMCNrpVpbolSA'),
  router: L.Routing.mapbox('pk.eyJ1Ijoidm9yb2Jpb3Zha3Jpc3RpbmEiLCJhIjoiY2x0NGZjb3AzMDFiYjJpbzNkdGYyMzhyYSJ9.YhxKc5Z5NVMCNrpVpbolSA', {profile: 'mapbox/walking'}),
  routeWhileDragging: true,
  language: 'ru',
  position: 'topleft',
  collapsible: true,
  reverseWaypoints: true
}).addTo(map);

// L.Routing.errorControl(mycontrol).addTo(map);

mycontrol.hide()

function createButton(label, container) {
  var btn = L.DomUtil.create('button', '', container);
  btn.setAttribute('type', 'button');
  btn.innerHTML = label;
  return btn;
}

map.on('click', function(e) {
  var container = L.DomUtil.create('div'),
      startBtn = createButton('Начало маршрута', container),
      destBtn = createButton('Конец маршрута', container);

  L.popup()
      .setContent(container)
      .setLatLng(e.latlng)
      .openOn(map);

  L.DomEvent.on(startBtn, 'click', function() {
    mycontrol.spliceWaypoints(0, 1, e.latlng);
    map.closePopup();
  });

  L.DomEvent.on(destBtn, 'click', function() {
    mycontrol.spliceWaypoints(mycontrol.getWaypoints().length - 1, 1, e.latlng);
    map.closePopup();
  });
});


