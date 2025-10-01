import React, { useEffect}from "react";

export function MainFC(): React.JSX.Element {
    
    // const [title, ...more] = props.page;
    return (
        <>
        
        <header>
            <div className="flex items-center justify-between">
                <div className="flex items-left"></div>
                <div className="flex items-center"></div>
                <div className="flex items-right"></div>
            </div>
        </header>
        
        <main>
            <section className="flex h-screen justify-center ">
                <div className="flex h-screen relative items-center justify-center bg-gray-50">
                    <div className="z-10 w-full w-xs max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                            <h3 className="text-xl font-semibold">Sign In</h3>
                            <p className="text-sm text-gray-500">Use your email and password to sign in</p>
                        </div>
                        <form className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16" action="" encType="multipart/form-data" method="POST">
                            <input type="hidden" />
                            <div>
                                <label htmlFor="email" className="block text-xs text-gray-600 uppercase">Email Address</label>
                                <input id="email" type="email" placeholder="user@acme.com" autoComplete="email"  className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm" name="email" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-xs text-gray-600 uppercase">Password</label>
                                <input id="password" type="password" className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm" name="password" />
                            </div>
                            <button type="submit" aria-disabled="false" className="flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none">
                                SIgn in
                                <span aria-live="polite" className="sr-only" role="status">Submit form</span>
                            </button>
                            <p className="text-center text-sm ">
                            For you need the new accout? 
                            <a className="font-semibold" href="/register">Sign up</a>
                            
                            </p>
                        </form>
                        
                    </div>
                </div>

            </section>
        </main>
        </>
    );
};
