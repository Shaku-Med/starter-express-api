window.addEventListener('DOMContentLoaded', () => {
    let fncL = () => {
        try {
            let proxyEmbed = document.querySelector('#proxyEmbed')
            if (proxyEmbed) {
                let getA = () => {
                    try {
                        let a = document.querySelectorAll('a')
                        if (a) {
                            a.forEach(v => {
                                let hrf = v.href.match(/^https?:\/\//) ? v.href : `${new URL(proxyEmbed.src).search.split('?href=')[1]}${v.href}`
                                if (!hrf.includes(`${window.location.origin}/proxy`) && !hrf.includes(`${window.location.origin}/embeded.js`)) {
                                    let nh = `${window.location.origin}/proxy?link=${hrf.includes(window.location.origin) ? new URL(proxyEmbed.src).search.split('?href=')[1] + '/' + hrf.split(window.location.origin)[1] : hrf}`
                                    if (!nh.includes('javascript:') && !nh.includes('css:')) {
                                        v.href = `${nh}&primaryURL=${new URL(proxyEmbed.src).search.split('?href=')[1]}`
                                    }
                                }
                            })
                        } else {
                            getA()
                        }
                    } catch {
                        getA()
                    }
                }

                let getImg = () => {
                    try {
                        let a = document.querySelectorAll('img')
                        if (a) {
                            a.forEach(v => {
                                let hrf = v.src.match(/^https?:\/\//) ? v.src : `${new URL(proxyEmbed.src).search.split('?href=')[1]}${v.src}`
                                if (!hrf.includes(`${window.location.origin}/proxy`) && !hrf.includes(`${window.location.origin}/embeded.js`)) {
                                    let nh = `${window.location.origin}/proxy?link=${hrf.includes(window.location.origin) ? new URL(proxyEmbed.src).search.split('?href=')[1] + '/' + hrf.split(window.location.origin)[1] : hrf}`
                                    if (!nh.includes('javascript:') && !nh.includes('css:')) {
                                        v.src = `${nh}&primaryURL=${new URL(proxyEmbed.src).search.split('?href=')[1]}`
                                    }
                                }
                            })
                        } else {
                            getA()
                        }
                    } catch {
                        getA()
                    }
                }

                // let getLink = () => {
                //     try {
                //         let a = document.querySelectorAll('link')
                //         if (a) {
                //             a.forEach(v => {
                //                 let hrf = v.href.match(/^https?:\/\//) ? v.href :
                //                     `${new URL(proxyEmbed.src).search.split('?href=')[1]}${v.href}`
                //                 if (!hrf.includes(`${window.location.origin}/proxy`) && !hrf.includes(`${window.location.origin}/embeded.js`)) {
                //                     let nh = `${window.location.origin}/proxy?link=${hrf.includes(window.location.origin) ? new URL(proxyEmbed.src).search.split('?href=')[1] + '/' + hrf.split(window.location.origin)[1] : hrf}`
                //                     if (!nh.includes('javascript:') && !nh.includes('css:')) {
                //                         v.href =  `${nh}&primaryURL=${new URL(proxyEmbed.src).search.split('?href=')[1]}`
                //                     }
                //                 }
                //             })
                //         } else {
                //             getLink()
                //         }
                //     } catch {
                //         getLink()
                //     }
                // }

                let getScript = () => {
                    try {
                        let a = document.querySelectorAll('script')
                        if (a) {
                            a.forEach(v => {
                                let hrf = v.src.match(/^https?:\/\//) ? v.src :
                                    `${new URL(proxyEmbed.src).search.split('?href=')[1]}${v.src}`
                                if (!hrf.includes(`${window.location.origin}/proxy`) && !hrf.includes(`${window.location.origin}/embeded.js`)) {
                                    let nh = `${window.location.origin}/proxy?link=${hrf.includes(window.location.origin) ? new URL(proxyEmbed.src).search.split('?href=')[1] + '/' + hrf.split(window.location.origin)[1] : hrf}`
                                    if (!nh.includes('javascript:') && !nh.includes('css:')) {
                                        v.src = `${nh}&primaryURL=${new URL(proxyEmbed.src).search.split('?href=')[1]}`
                                    }
                                }
                            })
                        } else {
                            getLink()
                        }
                    } catch {
                        getLink()
                    }
                }
                getImg()
                getScript()
                    // getLink()
                getA()

                // 

                setInterval(() => {
                    getImg()
                    getScript()
                        // getLink()
                    getA()
                }, 2 * 1000)
            } else {
                fncL()
            }
        } catch {
            fncL()
        }
    }

    fncL()
})