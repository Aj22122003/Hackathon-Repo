import { Input, Button, Card, Spacer, Textarea } from '@nextui-org/react';

const Contact = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#232323] p-4">
            <Card className="max-w-full w-1/3 p-6 bg-background text-text">
                <h2 className="text-2xl font-semibold text-primary text-center mb-4">Contact Us</h2>

                <form className="space-y-6">
                    {/* Name Input */}
                    <Input 
                        label="Name" 
                        placeholder="Enter your name"
                        required
                        className="w-full text-text"
                        aria-label="Name"
                    />

                    {/* Email Input */}
                    <Input 
                        label="Email" 
                        type="email" 
                        placeholder="Enter your email"
                        required
                        className="w-full text-text"
                        aria-label="Email"
                    />

                    {/* Message Input */}
                    <Textarea 
                        label="Message" 
                        placeholder="Enter your message"
                        required
                        className="w-full text-text"
                        aria-label="Message"
                        minRows={4}
                    />

                    <Spacer y={1} />

                    {/* Submit Button */}
                    <Button 
                        className="w-full bg-primary text-background hover:bg-secondary" 
                        type="submit"
                        aria-label="Submit"
                    >
                        Send Message
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default Contact;
