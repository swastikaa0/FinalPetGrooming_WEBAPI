import { handleGetNotifications } from "@/lib/actions/notification-action";
import {
  CalendarCheck,
  Scissors,
  Bell,
  Clock,
} from "lucide-react";

const notificationIcons: any = {
  booking: CalendarCheck,
  service: Scissors,
  appointment: Clock,
};

const notificationColors: any = {
  booking: "bg-blue-100 text-blue-700",
  service: "bg-purple-100 text-purple-700",
  appointment: "bg-green-100 text-green-700",
};

const isNewNotification = (createdAt: string) => {

  const currentTime = new Date().getTime();

  const notificationTime =
    new Date(createdAt).getTime();


  const difference =
    currentTime - notificationTime;


  
  return difference < 60000;

};

export default async function NotificationPage() {
  const response = await handleGetNotifications();

  const notifications = response.data || [];

  return (
    <div className="min-h-screen bg-[#F8F6F1] px-6 py-10">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10 rounded-3xl bg-white p-8 shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-4xl font-bold text-[#445D42]">
                Notifications
              </h1>

              <p className="mt-2 text-gray-500">
                Stay updated with your bookings and services.
              </p>

            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#445D42]/10">

              <Bell
                className="text-[#445D42]"
                size={32}
              />

            </div>

          </div>

          <div className="mt-6 inline-flex rounded-full bg-[#445D42] px-5 py-2 text-sm font-semibold text-white">

            {notifications.length} Notification
            {notifications.length !== 1 && "s"}

          </div>

        </div>

        {/* Empty State */}
        {notifications.length === 0 && (

          <div className="rounded-3xl bg-white p-14 text-center shadow-lg">

            <Bell
              size={60}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-5 text-2xl font-bold text-[#445D42]">
              No Notifications
            </h2>

            <p className="mt-3 text-gray-500">
              You're all caught up! New notifications will appear here.
            </p>

          </div>

        )}

        {/* Notifications */}
        <div className="space-y-6">

          {notifications.map((notification: any) => {

            const Icon =
              notificationIcons[notification.type] || Bell;

            const iconStyle =
              notificationColors[notification.type] ||
              "bg-gray-100 text-gray-600";

            return (

              <div
                key={notification._id}
                className={`rounded-3xl border bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl

                ${
                  notification.isRead
                    ? "border-gray-200"
                    : "border-green-300 bg-green-50"
                }
                `}
              >

                <div className="flex gap-5">

                  {/* Icon */}
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${iconStyle}`}
                  >
                    <Icon size={30} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">

                    <div className="flex items-start justify-between">

                      <div>

                        <h2 className="text-xl font-bold text-[#445D42]">
                          {notification.title}
                        </h2>

                        <p className="mt-2 text-gray-600 leading-relaxed">
                          {notification.message}
                        </p>

                      </div>

                      {!notification.isRead &&
                      isNewNotification(notification.createdAt) && (

                         <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                           NEW
                          </span>

                             )}

                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">

                      <p className="text-sm text-gray-500">

                        {new Date(
                          notification.createdAt
                        ).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}

                      </p>

                      <span
                        className={`rounded-full px-4 py-1 text-sm font-semibold

                        ${
                         notification.isRead ||
                        !isNewNotification(notification.createdAt)

                         ? "bg-green-100 text-green-700"

                             : "bg-red-100 text-red-700"
                        }
                        `}
                      >
                        {
                     notification.isRead ||
                        !isNewNotification(notification.createdAt)
                       ? "Read"
                       : "Unread"
}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </div>
  );
}