"use client";

const Policy: React.FC = () => {
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto leading-relaxed text-gray-800">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
                EVOFAST English Learning App
            </h1>

            <section className="space-y-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">1. Introduction</h2>
                    <p>
                        Welcome to the <strong>EVOFAST English Learning</strong> application — an online English-learning
                        platform provided by <strong>EVOFAST Japan</strong>. This application is designed to support
                        employees and learners in improving their English communication skills within a corporate
                        environment. By accessing or using this application, you agree to comply with the terms and
                        conditions outlined in this Page Policy.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">2. Scope of Application</h2>
                    <p>This policy applies to:</p>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>The <strong>EVOFAST English Learning</strong> mobile application</li>
                        <li>The official EVOFAST learning management website or platform (LMS)</li>
                        <li>All features, lessons, quizzes, and related educational content</li>
                        <li>All users (employees, learners, instructors, or invited participants) who access the system</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">3. User Rights and Responsibilities</h2>

                    <h3 className="font-semibold mt-3 text-lg">User Rights</h3>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>Access and use all available learning features, lessons, and tests.</li>
                        <li>Receive technical support when encountering issues with the app.</li>
                        <li>Have personal information protected under the Privacy Policy.</li>
                    </ul>

                    <h3 className="font-semibold mt-3 text-lg">User Responsibilities</h3>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>Provide accurate and truthful information when registering or logging in (if applicable).</li>
                        <li>Do not share your account or password with other individuals.</li>
                        <li>Do not post, share, or distribute any content that violates laws, ethics, or copyrights.</li>
                        <li>Do not attempt to copy, modify, or access the system’s source code or data for purposes other than learning.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">4. Intellectual Property Rights</h2>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>All contents, designs, lessons, audio, video, and learning materials are owned by <strong>EVOFAST Japan</strong> or authorized partners.</li>
                        <li>Users may use the materials only within the scope of internal learning and may not copy, distribute, or use them for commercial purposes.</li>
                        <li>Any act of copyright infringement will be handled in accordance with applicable laws.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">5. Data and Privacy</h2>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>This application <strong>does not collect any payment or financial information</strong>.</li>
                        <li>Certain technical data (e.g., device ID, usage time, test results) may be collected to improve service quality.</li>
                        <li>User data is used strictly within EVOFAST for educational and training purposes only.</li>
                        <li>No personal data will be shared with third parties without user consent, except when required by law.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">6. Limitation of Liability</h2>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>EVOFAST shall not be held responsible for any indirect damages resulting from the user’s misuse of the application.</li>
                        <li>The service may be temporarily suspended for maintenance or updates without prior notice.</li>
                        <li>While EVOFAST strives to ensure system stability, it does not guarantee uninterrupted or error-free operation.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">7. Updates and Revisions</h2>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>EVOFAST reserves the right to amend or update this Page Policy whenever necessary to comply with legal or operational changes.</li>
                        <li>
                            Any major changes will be announced within the application or on the official website:
                            <a href="https://www.evofast-jp.com" target="_blank" className="text-blue-600 underline ml-1">
                                https://www.evofast-jp.com
                            </a>.
                        </li>
                        <li>Continued use of the app after such changes constitutes acceptance of the updated policy.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">8. Contact Information</h2>
                    <p>For any inquiries, feedback, or technical support, please contact:</p>
                    <p className="mt-2">
                        🌐 Website:{" "}
                        <a href="https://www.evofast-jp.com" target="_blank" className="text-blue-600 underline">
                            https://www.evofast-jp.com
                        </a><br />
                        {/* 📧 Email: info@evofast-jp.com */}
                    </p>
                </div>

                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">9. Effective Date</h2>
                    <p>
                        This policy takes effect on the date of publication and applies to all users of the
                        <strong> EVOFAST English Learning</strong> application.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Policy;
