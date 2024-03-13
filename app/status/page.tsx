import NavBar from "@/components/navbar/nav-bar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function TerminalStatusPage(){
    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-300 flex flex-col items-center">
            <NavBar child="status"/>
            <div className="h-fit grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <Card className="size-40">
                    <CardHeader className="p-3 pb-1">
                        <CardTitle>Terminal 1</CardTitle>
                        <CardDescription>Jumping Jack</CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pb-1">
                        <p>Owner: Airline 1</p>
                    </CardContent>
                    <CardFooter className="p-3">
                        <p>1000 P / s</p>
                    </CardFooter>
                </Card>
                <Card className="size-40">
                    <CardHeader className="p-3 pb-1">
                        <CardTitle>Terminal 1</CardTitle>
                        <CardDescription>Jumping Jack</CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pb-1">
                        <p>Owner: Airline 1</p>
                    </CardContent>
                    <CardFooter className="p-3">
                        <p>1000 P / s</p>
                    </CardFooter>
                </Card>
                <Card className="size-40">
                    <CardHeader className="p-3 pb-1">
                        <CardTitle>Terminal 1</CardTitle>
                        <CardDescription>Jumping Jack</CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pb-1">
                        <p>Owner: Airline 1</p>
                    </CardContent>
                    <CardFooter className="p-3">
                        <p>1000 P / s</p>
                    </CardFooter>
                </Card>
                <Card className="size-40">
                    <CardHeader className="p-3 pb-1">
                        <CardTitle>Terminal 1</CardTitle>
                        <CardDescription>Jumping Jack</CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pb-1">
                        <p>Owner: Airline 1</p>
                    </CardContent>
                    <CardFooter className="p-3">
                        <p>1000 P / s</p>
                    </CardFooter>
                </Card>
                <Card className="size-40">
                    <CardHeader className="p-3 pb-1">
                        <CardTitle>Terminal 1</CardTitle>
                        <CardDescription>Jumping Jack</CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pb-1">
                        <p>Owner: Airline 1</p>
                    </CardContent>
                    <CardFooter className="p-3">
                        <p>1000 P / s</p>
                    </CardFooter>
                </Card>
                <Card className="size-40">
                    <CardHeader className="p-3 pb-1">
                        <CardTitle>Terminal 1</CardTitle>
                        <CardDescription>Jumping Jack</CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pb-1">
                        <p>Owner: Airline 1</p>
                    </CardContent>
                    <CardFooter className="p-3">
                        <p>1000 P / s</p>
                    </CardFooter>
                </Card>
                <Card className="size-40">
                    <CardHeader className="p-3 pb-1">
                        <CardTitle>Terminal 1</CardTitle>
                        <CardDescription>Jumping Jack</CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pb-1">
                        <p>Owner: Airline 1</p>
                    </CardContent>
                    <CardFooter className="p-3">
                        <p>1000 P / s</p>
                    </CardFooter>
                </Card>
            </div>
        </main>
    )
}