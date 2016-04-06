// persisting email as _user in the cookies for the user to identify in the sessions.
app.service('IdentifyDeviceTypeFactory',
    ['detectUtils', 'OS_TYPE', 'deviceDetector',
        function (detectUtils, OS_TYPE, deviceDetector) {

            return {
                checkDeviceType: function () {

                    if (detectUtils.isAndroid()) {
                        return OS_TYPE.ANDROID;
                    } else if (detectUtils.isIOS()) {
                        return OS_TYPE.IOS;
                    } else if (detectUtils.isMobile() || deviceDetector.isDesktop()) {
                        return OS_TYPE.WEB_BROWSER;
                    }
                    return OS_TYPE.UNKNOWN;
                }
            }
        }
    ]
)