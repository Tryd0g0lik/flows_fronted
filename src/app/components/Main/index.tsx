import { PageMeta } from "@interfeces";
import React, { useEffect}from "react";
import "./style.scss";

export function MainFC({...props}: PageMeta): React.JSX.Element {
    
    const {title, ...more} = props.page;
    return (
        <>
        
        <header>
            <div className="flex items-center justify-between">
                <div className="flex items-left"></div>
                <div className="flex items-center"></div>
                <div className="flex items-right"></div>
            </div>
        </header>
        <div className="h flex items-center justify-center">
            <h1>{title}</h1>
        </div>
        <main>
            <section className="flex justify-center w-7xl">
                
                <div className="flex max-w-full w-full relative items-center justify-center bg-gray-50">
                    <div className="z-10  w-full overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                        <div className="flex flex-col w-full items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                            <h3 className="text-xl font-semibold">Записи</h3>
                        </div>
                        <div className="overflow-x-auto  max-w-full w-full">
                            <table className="table table-zebra">
                                {/* head */}
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Favorite Color</th>
                                </tr>
                                </thead>
                                <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>1</th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Blue</td>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <th>2</th>
                                    <td>Hart Hagerty</td>
                                    <td>Desktop Support Technician</td>
                                    <td>Purple</td>
                                </tr>
                                {/* row 3 */}
                                <tr>
                                    <th>3</th>
                                    <td>Brice Swyre</td>
                                    <td>Tax Accountant</td>
                                    <td>Red</td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                    </div>
                </div>

            </section>
        </main>
        </>
    );
};
