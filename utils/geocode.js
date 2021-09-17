import request from 'postman-request'

export const getGeoCode = (location, callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiYmhhcmF0LWtlbmRyZSIsImEiOiJjazFhN3Q2dHIwaDhuM29xd2s1Z3l5Ym5xIn0.ZCAjaGlNdB18OVLC-GLgbg&limit=1`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect mapbox API');
        } else if(body.features.length == 0 ){
            callback(`Unable to find ${body.query[0]?? 'entered'} location. Try another search`);
        }else {
            const placeDetail = body.features[0];
            const latitude = placeDetail.center[1];
            const longitude = placeDetail.center[0]
            callback(undefined, {
                latitude,
                longitude,
                location : placeDetail.place_name
            });
        }
    })

}