/**
 * UpSnap App
 * Defined an App to manage upsnap
 */
var UpSnapApp = UpSnapApp || {} //Define upsnap App namespace.
/**
 * Constructor UNAS App
 */
UpSnapApp.App = function () {
  this.id = 'UpSnap'
  this.name = 'UpSnap'
  this.version = '6.0.1'
  this.active = false
  this.menuIcon = '/apps/upsnap/images/logo.png?v=6.0.1&'
  this.shortcutIcon = '/apps/upsnap/images/logo.png?v=6.0.1&'
  this.entryUrl = '/apps/upsnap/index.html?v=6.0.1&'
  var self = this
  this.UpSnapAppWindow = function () {
    if (UNAS.CheckAppState('UpSnap')) {
      return false
    }
    self.window = new MUI.Window({
      id: 'UpSnapAppWindow',
      title: UNAS._('UpSnap'),
      icon: '/apps/upsnap/images/logo_small.png?v=6.0.1&',
      loadMethod: 'xhr',
      width: 750,
      height: 480,
      maximizable: false,
      resizable: true,
      scrollbars: false,
      resizeLimit: { x: [200, 2000], y: [150, 1500] },
      contentURL: '/apps/upsnap/index.html?v=6.0.1&',
      require: { css: ['/apps/upsnap/css/index.css'] },
      onBeforeBuild: function () {
        UNAS.SetAppOpenedWindow('UpSnap', 'UpSnapAppWindow')
      },
    })
  }
  this.UpSnapUninstall = function () {
    UNAS.RemoveDesktopShortcut('UpSnap')
    UNAS.RemoveMenu('UpSnap')
    UNAS.RemoveAppFromGroups('UpSnap', 'ControlPanel')
    UNAS.RemoveAppFromApps('UpSnap')
  }
  new UNAS.Menu(
    'UNAS_App_Internet_Menu',
    this.name,
    this.menuIcon,
    'UpSnap',
    '',
    this.UpSnapAppWindow
  )
  new UNAS.RegisterToAppGroup(
    this.name,
    'ControlPanel',
    {
      Type: 'Internet',
      Location: 1,
      Icon: this.shortcutIcon,
      Url: this.entryUrl,
    },
    {}
  )
  var OnChangeLanguage = function (e) {
    UNAS.SetMenuTitle('UpSnap', UNAS._('UpSnap')) //translate menu
    //UNAS.SetShortcutTitle('UpSnap', UNAS._('UpSnap'));
    if (typeof self.window !== 'undefined') {
      UNAS.SetWindowTitle('UpSnapAppWindow', UNAS._('UpSnap'))
    }
  }
  UNAS.LoadTranslation(
    '/apps/upsnap/languages/Translation?v=' + this.version,
    OnChangeLanguage
  )
  UNAS.Event.addEvent('ChangeLanguage', OnChangeLanguage)
  UNAS.CreateApp(
    this.name,
    this.shortcutIcon,
    this.UpSnapAppWindow,
    this.UpSnapUninstall
  )
}

new UpSnapApp.App()
