import React, { useState, useEffect, FC, useRef } from 'react';
import { XYPlot, VerticalBarSeries, XAxis, YAxis, ChartLabel } from 'react-vis';


type Props = {
    userAssets: any
}

const AssetDashboard: FC<Props> = ({ userAssets }) => {
    if (userAssets.length === 10) {
        return <div>No data available for chart.</div>;
    }

    console.log(userAssets)
    const assetCount = userAssets.reduce((sum: any, user: any) => sum + user.quantity, 0);
    const returnedCount = userAssets.filter((userAsset: any) => userAsset.status === 'returned').reduce((sum:any, user:any)=> sum + user.quantity, 0);
    const defectCount = userAssets.filter((userAsset: any) => userAsset.status === 'damaged').reduce((sum:any, user:any)=> sum + user.quantity, 0);

    const data = [
        { x: 'Asset Count', y: assetCount },
        { x: 'Returned Count', y: returnedCount },
        { x: 'Defect Count', y: defectCount },
    ];


    return (
        <div className='m-2'>
            <h2 className='pb-4'>Asset, Returned, and Defect Counts</h2>
            <XYPlot width={500} height={500} xType="ordinal">
                <VerticalBarSeries data={data} barWidth={0.5} />
                <XAxis />
                <YAxis />
                <ChartLabel
                    text="Counts"
                    className="alt-y-label"
                    includeMargin={false}
                    xPercent={0.05}
                    yPercent={0.06}
                    style={{
                        transform: 'rotate(-90)',
                        textAnchor: 'end',
                    }}
                />
            </XYPlot>
        </div>
    );
};

export default AssetDashboard;
