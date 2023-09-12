# fengmap

FengMap JavaScript SDK 是 FengMap Cloud 的一部分，使用 FengMap JavaScript SDK 您可以轻松将基于 WebGL 技术的 3D 室内地图集成到您的 Web 应用程序中，FengMap Cloud 为用户提供了完整室内空间平面图的绘制，主题设计、数据整合及二次开发工具为一体的解决方案。

[了解蜂鸟云](https://cloud.fengmap.com)｜[JavaScript SDK 示例代码](https://developer.fengmap.com/fmAPI/help-fmdemo.html#Basic)


# JavaScript SDK v3.1.1   2023-04-13
优化修复：
1. 优化：室内外一体化主地图的主题兼容性；
2. 修复：修复 iOS 系统更新 iOS 16.4 后的导航线变黑的问题；
3. 修复了部分已知bug。

# JavaScript SDK v3.1.1   2023-03-23

更新内容：
1. 新增：`FM3DTilesLayer`3D瓦片类，用于给场景中增加蜂鸟提供的 3Dtiles 三维瓦片数据；
2. 新增：`FMDynamicTextureTool` 纹理资源管理类，结合 `getTextureNames()` 方法，用于更换外部模型的指定纹理为视频或gif动画；
3. 新增：`FMFireMarker` 火焰对象类，用于给地图场景中增加火焰效果；
4. 新增：`FMWallMarker` 围墙标注对象类，用于给场景中增加围墙标注；
5. 新增：`FMTubeMarker` 管道标注对象类，用于为场景中添加管道类标注；
6. 新增：`FMLine3dMarker` 3D线标注对象类，用于为场景中增加3D线标注；
7. 新增：`FMSphereMarker` 球标注对象类，用于为场景中增加球/半球类标注；
8. 新增：`FMFog` 雾化效果类，为场景增加迷雾特效；
9. 新增：`FMFlow` 流光效果类，用于为场景中的`FMLine3dMarker`、`FMWallMarker`、`FMTubeMarker`添加流光效果；
10. 新增：`FMOutline` 高亮轮廓线类，用于为 `FMModel`、`FMExternalModel`、`FMDynamicModel` 提供一种边缘高亮的特效；
11. 新增：`FMDiffusion` 扩散效果类，用于为场景中的 `FMSphereMarker` 增加扩展效果；
12. 新增：`FMSweep` 类里的 `annulus(options)` 增加 `strength` 和 `url` 参数，用于为环形扫光效果增加光照强度和贴图的设置；
13. 新增：`FMWater` 类初始化增加 <code>sprayInfos</code> 浪花参数，用于为水波纹添加浪花特效；
15. 新增：`FMMap(options)` 增加 `followFocus` 参数，满足多地图室内外一体化场景下，地图或楼层切换时，视图高度是否需要跟随聚焦层的变化而变化的功能；
14. 新增：`FMMap(options)` 增加 `lockedLight` 参数，用于开启/关闭灯光位置锁定，使其始终与视图位置保持一致，即开启后视图看到的永远是光亮面；
16. 新增：`getActionNames()`、`startAction(name, once)`、`stopAction(name)` 设置外部模型动画的相关方法，结合 `FMMap(options)`里的新增参数 <code>autoPlay</code>，自主控制播放 externalModel 里的动画；
17. 新增：`setThemeExtension(data)` json的 `storelabeltheme` 节点下增加字体样式 fontfamily、图标大小 imagesize、文字粗细 fontweight、图标与文字间距space等字段参数，用于丰富和优化label的显示效果；
18. 新增：`FMToolbar(options)` 增加`entranceIcon` 参数，用于控制室内外一体化场景中是否显示进出子建筑的控件；
19. 新增：`FMInteracations` 类增加 `enableDamping`用于开启/关闭惯性缓动效果；
20. 新增：`FMDynamicModel(options)` 里增加 `tilt` 参数，用于设置动态模型的倾斜角度；同时新增 `FMDynamicModel.tilt` 属性，用于获取动态模型的倾斜角度；
21. 新增：`request.addCondition` 里增加 `matchCase` 满足是否忽略英文大小写的查询；
22. 新增：`FMBuilding` 类增加属性字段如`alias`、`eName`、`x`、`y`、`zoomRange`，为子地图提供更多数据属性信息;
23. 新增：`getFadeFeatures()` 方法，用于获取子地图所关联的室外元素；
24. 新增：`FMExport` 地图导出类，归属于`fengmap.plugins-export.min.js`插件，满足含DOM元素的地图导出为图片需求；`FMExport` 类里`FMExport.screenshot(map, options, callback)` 、`exportToImage(map, bound, options, success, failed)`方法从本版本开始将取代fengmap.FMUtil同名方法，后者里的同名方法将不再维护 。


优化修复：
1. 修复：`FMBuilding.floorSpace` 错误的问题；
2. 修复：添加 `FMDomMarker` 后再使用 <code>map.dispose</code> 报错的问题;
3. 优化：`click` 事件，满足点击位置仅为 `FMTileLayer` 时，也能返回xy坐标的需求；
4. 优化：`FMWater` 类的整体效果，使其半透明时能显示水下的贴图；
5. 优化：`toolBarStyle.css` 默认控件样式，包含指北针、单/多楼层切换、2/3D切换、楼层控件；同时新增 `FMZoomBar` 类将取代 `FMZoomControl`，为用户开放自定义缩放控件样式；
6. 优化：多地图室内外一体化场景中跨子地图的车行路径算法；
7. 优化：删除 `FMFlowline` 类及内部属性、方法，可用新增的 `FMFlow` 类来实现流动光特效；
8. 优化：室内外一体化场景中主图主题的字段取值，请反馈数据部提供适用于本版本的新主题。

JavaScript SDK v3.0.9   2022-04-26
==

更新内容：
1. 新增：`FMNaviWalkAnalyser` 、`FMNavigationWalk`类，用于人行模式的路径分析及导航规划，原`FMNaviAnalyser`、`FMNavigation`类后续将不再维护；
2. 新增：`FMNaviDriveAnalyser` 、`FMNavigationDrive`类，用于驾车模式的路径分析及导航规划；
3. 新增：`FMMap(options)` 中增加 `collisionOrder` ，用于在初始化环节设置imagemarker和textmarker两个图层的避让排序；
4. 新增：`FMMap` 类增加 `getCollisionOrder()`、`setCollisionOrder(collisionOrder)` 方法，用于获取/设置部分覆盖物避让排序；
5. 新增：所有节点类型增加`bound`属性，用于获取各节点的范围，原`getBound()`方法后续将不再维护；
6. 新增：`fengmap.plugins-mapedit.min.js`插件，用于实现绘制/编辑点、线、面过程、框选地图要素的功能；
7. 新增：`fengmap.plugins-track-player.min.js`插件，用于实现轨迹回放、快进的功能。

优化修复：
1. 优化：三方底图的实现方式，增加雾化效果，修复抖动问题。

JavaScript SDK v3.0.8   2022-03-16
==

更新内容：
1. 新增： `FMScaleBar` 类，用于实现比例尺控件；
2. 新增： `FMHDR` 类，用于在地图场景中增加HDR环境贴图效果；
3. 新增： `FMTextureBasedSkybox` 类，用于实现基于纹理的天空盒场景效果。

优化修复：
1. 优化：部分特殊场景的路径算法。


JavaScript SDK v3.0.7   2022-2-10
==

更新内容：
1. 新增： `FMExtent` 类和 `FMModel` 类增加 `getArea()` 方法，用于获取地图要素的面积；
2. 新增： `FMMap(options)`  中增加 `hideList`，用于在初始化环节隐藏；
3. 新增： `FMMap` 类增加 `info` 事件，用于查看地图运行时返回的信息，如未加载出地图时的错误原因；
4. 新增： `FMMap.setState(state, options)` 增加回调参数 `animate` 、`finish` ，使地图状态更可控；
5. 新增： `FMExternalModel` 类增加 `color`属性，支持修改外部模型颜色；
6. 新增： `FMMap` 类增加 `externalFirstLoaded` 外部模型首次加载完成事件；
7. 新增： `FMPolygonMarker` 类增加 `getInsideCenter()`方法，用于获取多边形内部中心点；
8. 新增： `FMNaviAnalyser.route(request, success, failed)` 增加 `viapoints` 参数，满足多途经点路径规划需求。


优化修复：
1. 修复：主题中存在缺失图片时报错问题；
2. 优化： `DOMMarker` 类的性能；
3. 优化：开放楼层控件样式，方便用户按需自定义样式，升级SDK请务必下载最新版本，并引用对应的 css 样式文件；
4. 优化：引擎内部光照效果，如不满足需求可根据 `FMMap(options)` 中 lightParam 参数进行调整或恢复到旧版本。


JavaScript SDK v3.0.6   2021-11-04
==

更新内容：
1. 新增：`click` 事件支持拾取 LineMarker对象；
2. 新增：`fengmap.FMUtil.coordsScreenToMap(map, options)` 增加 `z`、`level`；
3. 新增：`click` 事件返回内容中增加 event.coords.z、event.level；
4. 新增：`fengmap.FMLineMarker(options)` 新增 `depth` 参数,取值为`false`时 Linemarker 不会被model遮挡；
5. 新增：`fengmap.FMTileProvider()` 增加 `TD_VECTOR`、`TD_SATELLITE` 三方背景底图；
6. 新增：`addCondition(type)` 增加`contain`属性，用于查询包含参数坐标的元素;
7. 新增：`fengmap.getFloorInfos()` 用于获取所有楼层的信息；
8. 新增：限制地图拖拽范围功能，见`FMMap(options)`  中 `enabledPanRange`、`panRangeValue` 参数。

优化修复：
1. 修复：`DOMmarker`遮挡楼层控件问题；
2. 修复：`FMMap(options)`中 `nonFocusAlpha` 不生效问题；
3. 修复：Mac Safari 15.0 兼容问题；
4. 修复：调用`autoRotate`方法 marker 位置存在偏移问题；

JavaScript SDK v3.0.5   2021-09-06
==

更新内容：
1.	新增：`FMTileProvider`类，支持将多种三方瓦片数据添加为背景底图；
2.	新增：`export(param)`方法，支持导出高清图片；
3.	新增：`adjustRenderOrder(array)`方法，用于调整渲染顺序；
4.	新增：`FMMap(options)`增加`state`、`center`、`rotation`参数，用于设置地图初始化状态；
5.	新增：`FMMap(options)`增加`mapURLAbsolute`用以标识地图数据资源路径是否为绝对路径；
6.	新增：`FMMap.setHighlightColor()`方法用于设置高亮颜色。



优化修复：
1.	优化：`FMMap(options)`增加`highlightColor`、`highlightPicker`两个属性，同时移除`fengmap.FMHighlightMode`类，用于设置高亮颜色；
2.	优化：`FMSearchAnalyser`类的返回结果，并新增`name`和`ename`的模糊搜索查询功能，见`addCondition(type)`方法；
3.	优化：废弃`visibleLevelsChanged`，使用`visibleLevelsLoaded`替代；
4.	优化：3D模式点击事件的返回坐标信息；
5.	修复了部分已知bug。

JavaScript SDK v3.0.4   2021-07-13
==

更新内容：
1.	新增：`fengmap.FMMap(options)`增加lock参数在初始化环节关闭所有交互，同时优化`FMInteracations`类；
2.	新增：`FMFloor`类新增`floorID`属性，用于标识楼层的唯一值；
3.	新增：`pickFilterFunction()`过滤设置可点击拾取函数；
4.  新增：`FMFacility`类增加`boost()`、`jump()`图标跳动的方法。


优化修复：
1.	优化：移动端手势交互事件；
2.  优化：`map.dispose()`处理机制；
3.	优化：`FMLabel`、`FMFacility`自身及其与覆盖物之间的避让算法；
4.	优化：`fengmap.FMToolbar(option)`增加`needAllLayerBtn`显示单多层按钮；
5.	优化：`FMEdgeMode`类边缘线模式的命名；
6.	优化：`FMExtrudeMarker`新增`extrudeHeight`方法，用于获取/修改拉伸高度；
7.	优化：`FMInteracations`类增加`enableRotate`禁止旋转；	
8.	修复：`fengmap.FMLineType.ARROW`线型在2D模式缺少箭头的问题；
9.	修复：`Fengmap.FMUtil.coordsScreenToMap`屏幕坐标到地图坐标转换的问题；
10.	修复：使用`autoRotate()`旋转地图再停止后添加覆盖物坐标错误问题。

JavaScript SDK v3.0.3 2021-06-04
==

更新内容：

1. 新增：`LocationMarker` 支持动态修改 size 属性；
2. 新增：`LocationMarker` 支持动态修改 url 属性；
3. 新增：在 `FMMap.setTheme` 方法上，增加可选参数 `themeExtension` ，支持将扩展主题和原主题合并。

优化修复：

1. 优化：`FMWater` 水波纹增加倒影效果；
2. 修复：移动端兼容性问题；
3. 修复：修改楼层间距后 `FMLineMarker` 的高度未跟随地图调整间距的问题。

JavaScript SDK v3.0.0 2021-04-29
==

更新内容：
* 提供地图数据、主题数据的在线加载；
* 支持二、三维显示，单层、多楼层显示；
* 支持单击、倾斜、旋转、缩放等地图操作；
* 支持同层、跨层路径规划；
* 可添加自定义文字、图片、定位标注物；
* 可对底图数据模型、文字标签、公共设施、自定义标注进行拾取和检索。

JavaScript SDK v2.7.1 2020-11-26
==

更新内容：
* 新增：支持通过主题样式添加2.0的gltf格式的3D模型；
* 新增`FMExtrudeMarker`类用于添加拉伸几何体，并支持填充色及顶面边线颜色的修改；
* 新增：FMDynamicModel 类增加`moveTo(params)`、`moveToGroup(gid)`、`setPosition(x, y, gid, height)`方法；
* 新增：添加导航走过路线颜色变化，默认是灰色，可以通过FMNavigation.setNaviAcrossLineOption()设置走过路线的属性；
* 新增将地图的固定级别导出为图片的接口：`printing`；
* 新增以模型为中心点的自动旋转方法：`setAutoRotateBymodel(isrote)`，以及在旋转中添加坐标的方法：`getRotationCoord(x, y)`；
* 新增：支持通过主题样式添加含骨骼动画的externalmodel；
* 新增单层自适应路线全览方法：`AdaptiveLineOverview()`；
* 新增：在polygonmarker上增加：`getPoints()`方法，用于获取图形点的坐标；
* 增加drawLineMark绘制完成的回调：`drawLineMark(line, style, back)`；
* 新增layerRenderOrder以调整标注图层如imagemarker和textmarker的渲染顺序。

优化修复：

* 优化：修复`domMarker.show`不起作用的问题；
* 优化：修复多次添加、移除DOMmarker后的卡顿问题；
* 优化：修复`fengmap.FMCalculator.WGS84ToWebMercator` 函数报错问题；
* 优化：优化地图中的externalModel支持分级别显示；
* 修复：搜索externalmodel时存在丢失的问题；
* 修复：增加`setFlashColor(color)`以修复FMModel通过Flash实现闪烁时未根据设置颜色闪烁的问题
* 修复：指北针图片方向及在sdk的展现形式。

JavaScript SDK v2.7.0 2020-8-16
==
更新内容：

* 新增：`FMSkyEffect`类为场景添加天空盒，支持按当前时间自动更新或自定义任意时间的天空盒；
* 新增：`FMEffectRenderer`特效类，包含：bloom发光、阴影、SAO等光效渲染器；
* 新增：`FMWaterMarker`类为动态水波纹标注；并支持自定义形状、更改颜色及透明度；
* 新增：`FMSweepEffect`类为Standard材质的物体提供扫光效果扫光效果，支持自定义扫光速度及形状；
* 新增：`FMScreenEffect`类为屏幕后处理效果，用于为地图添加雨水效果；
* 新增：`FMFlowLineMarker`类为动态流光线标注，并支持设置流光颜色、速度及透明度等参数；
* 新增：`FMParticleEffect`粒子特效类，用于自定义添加雨、雪的粒子效果；
* 新增：新增`FMCalculator`计算类用来计算提供一些常用的计算函数；

优化修复：

* 修复：修复跨楼层导航中多楼层之间通行问题；
* 修复：修复楼层高度引起的楼层加载问题；
* 修复：地图初始化`DefaultBackgroundAlpha`不生效的问题；
* 修复：跨楼层导航策略及优先级问题；
* 优化：label图层`needAvoid`属性生效逻辑；
* 修复：修复DOMMarker的`Anchor`属性设置为BOTTOM时位置错误的问题。

JavaScript SDK v2.6.0 2020-06-30
==
更新内容：
* 新增：`drawLineMark(line, style)` 增加 `mapUrl` 属性用于配置 `LineMarker` 的样式；
* 新增：`Polygonmarker` 增加获取中心点坐标的接口 center ；
* 新增：`FMDynamicModel` 初始化属性中增加初始化旋转角度`rotation` 设置；
* 新增：增加设置导航到门点的方法 `navi.naviToDoor = true；`
* 新增：`PolygonMarker` 增加设置边框颜色 `lineColor:'#3CF9DF'`和修改边框颜色 `setLineColor();` 的属性和方法。

优化修复：
* 优化：支持解析蜂鸟云v2.0版主题编辑器的主题文件（按 FID 配置 label 及 poi 的样式）；
* 修复：解决个别数据无法显示精模 `externalmodel` 的问题；
* 修复：解决精模场景内，路径规划后点击背景或地板后报错问题；
* 修复：解决 `ImageMarker`、`Facility` 将非正方形图片变形的问题，支持上传非正方形的自定义图标；
* 优化：解决地图中label换行后文字不居中及文字变大的问题；
* 优化：`DOMmarker` 的显示/隐藏与楼层绑定; 
* 修复：解决热力图修改 max 属性不生效的问题。

JavaScript SDK v2.5.0 2020-04-29
==
更新内容：

*  新增：`FMDynamicModel` 类增加`startAction`/`stopAction`接口用于开始/停止模型对象骨骼动画；
*  新增：`FMDynamicModel` 类增加`stopMoveTo()`方法用于停止移动；
*  新增：`FMDynamicModel` 类增加`addNodes`、`removeNode`方法用于添加/删除模型对象。

优化修复：

*  优化：优化数据结构以提升加载速度，该版本sdk可同时兼容新旧结构的数据，新结构数据请在蜂鸟云平台控制台下载新版数据；
*  优化：优化SDK结构，提供了新的模块化加载方式，可按需添加；
*  优化：修复在IE浏览器下textmarker有`platecolor`时未居中的问题；
*  优化：修复`mapScale`设置不生效的问题；
*  优化：动态模型增加渐隐渐显效果；
*  优化：修复动态模型对象设置显示比例属性不生效的问题；
*  优化：修复动态模型对象不可复用的问题。